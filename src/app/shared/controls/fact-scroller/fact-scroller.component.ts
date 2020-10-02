import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FetchServiceService } from 'src/app/core/services/fetch-service.service';
import { CollectionType } from '../../enums/collectiontype.enum';
import { Fact } from '../../enums/division';
import { APIResponse } from '../../interfaces';

@Component({
  selector: 'app-fact-scroller',
  templateUrl: './fact-scroller.component.html',
  styleUrls: ['./fact-scroller.component.scss']
})
export class FactScrollerComponent extends DataSource<APIResponse> {

  private cachedFacts = Array.from<any>({ length: 0 });
  private dataStream = new BehaviorSubject<(any | undefined)[]>(this.cachedFacts);
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;
  private page = 1;
  totalPage = 0;
  public total;
  public filter: string = "";

  @Input() dataSource: any;
  @Input() loadText: String = 'Cargando...';

  constructor(private factService: FetchServiceService, private collection: CollectionType) {
    super();
    // Start with some data.
    this.cachedFacts = [];
    this.dataStream.next([])
    this._fetchFactPage();
  
   }

  connect(collectionViewer: CollectionViewer): Observable<(any |undefined)[] | ReadonlyArray<any | undefined>>  {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
          
      if (this.totalPage >= this.page) {
        this._fetchFactPage();
      }else{
        this.loadText = 'No more records found'
      }

    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  } 

  private _fetchFactPage(): void {
      this.factService.getRandomFact(this.collection, this.page, this.filter).subscribe(res => {
        this.cachedFacts = this.cachedFacts.concat(res);
        this.dataStream.next(this.cachedFacts);
      });  
      this.page++;
  }

  public makeFilter(filter: string){
    this.loadText = 'Cargando...';
    this.cachedFacts = [];
    this.dataStream.next([])
    this.page = 1;   
    this.filter = filter;
    this._fetchFactPage();
    
  }

}
