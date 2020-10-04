import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, pipe } from 'rxjs';
import { CollectionType } from 'src/app/shared/enums/collectiontype.enum';
import { firestore } from 'firebase/app';
import { map, filter } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';


@Injectable({
    providedIn: 'root'
})
export class FireStoreService {

    constructor(private readonly afs: AngularFirestore){

    }

    // GET ALL DOCUMENT FROM COLLECTION
    public getCollection(collection: CollectionType){
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
                                data.created_by_user = res.data();
                            });
                        }
                        return data;
                    }))
            );
    }
    
    // CREATE DOCUMENT
    public create(collection: CollectionType, model: any): Promise<any> {
        return this.afs.collection(collection).add(model);
    }

     // READ A DOCUMENT
     public getDocument(collection: CollectionType, id:string){
        return this.afs.collection(collection).doc(id).get();
    }

    // UPDATE A DOCUMENT
    public updateDocument(collection: CollectionType, model: any, id:string){
        return this.afs.collection(collection).doc(id).update(model);
    }

    // DELETE A DOCUMENT
    public deleteDocument(collection: CollectionType, id:string){
        return this.afs.collection(collection).doc(id).delete();
    }
    
}