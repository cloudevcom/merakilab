import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionType } from 'src/app/shared/enums/collectiontype.enum';


@Injectable({
    providedIn: 'root'
})
export class ModuleAPI {

    constructor(private readonly afs: AngularFirestore){}

    getModules() {
        return this.afs.collection(CollectionType.Module).valueChanges(); 
    }
}