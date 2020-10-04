import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionType } from 'src/app/shared/enums/collectiontype.enum';

@Injectable({
    providedIn: 'root'
})
export class UserAPI {

    constructor(private readonly afs: AngularFirestore) { }


    create(data: any){
      
    }

    getByEmail(email: string){
        return this.afs.collection(CollectionType.Account, ref => ref.where('email', '==', email))
        .valueChanges();
    }

   
}