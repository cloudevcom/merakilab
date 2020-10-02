import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionType } from 'src/app/shared/enums/collectiontype.enum';
import { APIResponse } from 'src/app/shared/interfaces';
import { ApiService } from './api.service';
import { FireStoreService } from './firebaseAPI.service';

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  constructor( public fs: FireStoreService,) { }

  getRandomFact(collection: CollectionType,  page: any, filter: string): Observable<any> { 
    return this.fs.getCollection(collection);
  }
}
