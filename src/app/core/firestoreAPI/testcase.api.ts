import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Guid } from 'guid-typescript';
import { map } from 'rxjs/operators';
import { CollectionType } from 'src/app/shared/enums/collectiontype.enum';

@Injectable({
    providedIn: 'root'
})
export class TestCaseAPI {

    constructor(private readonly afs: AngularFirestore) { }

    public getAll() {
        return this.afs.collection(CollectionType.Testcase, ref => ref.orderBy('code').limit(20))
            .snapshotChanges()
            .pipe(
                map(actions => actions
                    .filter(snap => snap.payload.doc.id != '--stats--')
                    .map(snap => {
                        const data: any = snap.payload.doc.data();
                        data.id = snap.payload.doc.id;
                        if (data.created_by_user) {
                            data.created_by_user.get().then(res => {
                                data.created_by = res.data();
                            });
                        }
                        return data;
                    }))
            );
    }

    public getById(id: string) {
        return this.afs.collection(CollectionType.Testcase).doc(id)
        .valueChanges()
        .pipe(
            map(item =>{
                const data: any = item;
                if (data.created_by_user) {

                    data.created_by_user.get().then(res => {
                        data.created_by_user = res.data();
                        data.created_by = `${ data.created_by_user.first_name}  ${data.created_by_user.last_name}`;
                    });

                    data.updated_by_user.get().then(res => {
                        data.updated_by_user = res.data();
                        data.updated_by = `${ data.updated_by_user.first_name}  ${data.updated_by_user.last_name}`;
                    });

                    data.created_date =  data.created_date.toDate();
                    data.updated_date =  data.updated_date.toDate();
                }
                return data;
            })
        );
    }

    public delete(id: string) {

        let response = new Promise((resolve, reject) => {
            const tcDocRef = this.afs.collection(CollectionType.Testcase).doc(id).ref;
            var statsRef = this.afs.collection(CollectionType.Testcase).doc('--stats--').ref;
            const decrement = firebase.firestore.FieldValue.increment(-1);
            const batch = this.afs.firestore.batch();

            batch.delete(tcDocRef);
            batch.update(statsRef, { counter: decrement })

            batch.commit().then(() => {
                return resolve("Testcase deleted successfully.");
            })
                .catch(error => reject(error));
        });

        return response;

    }

    public create(data: any): Promise<any> {
        data.created_date = new Date();
        var statsRef = this.afs.collection(CollectionType.Testcase).doc('--stats--').ref;
        const increment = firebase.firestore.FieldValue.increment(1);
        let promise = this.afs.firestore.runTransaction((trans: any) => {
            return trans.get(statsRef)
                .then((statsDoc: any) => {
                    if (!statsDoc.exists)
                        trans.set(statsRef, { counter: 0 });
                    const tcDocRef = this.afs.collection(CollectionType.Testcase).doc(Guid.create().toString()).ref
                    data.code = statsDoc.data() ? statsDoc.data().counter + 1 : 1;
                    data.created_by_user = this.afs.doc(`/Account/${firebase.auth().currentUser.uid}`).ref;
                    trans.set(tcDocRef, data);
                    trans.update(statsRef, { counter: increment });
                });
        });

        return promise;
    }

    public update(id: string, data: any) {
        data.updated_date = new Date();
        data.updated_by_user = this.afs.doc(`/Account/${firebase.auth().currentUser.uid}`).ref;
        return this.afs.collection(CollectionType.Testcase).doc(id).update(data);
    }
}