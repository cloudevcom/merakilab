import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Input() dataSource: any;
  searchBox: string;
  
  constructor() { }

  ngOnInit() {
  }

  doFilter(value: string) {
    this.dataSource.makeFilter(value);
  }

  onChange(value: any) {
    if (!value)
      this.dataSource.makeFilter('');
  }

  clear() {
    this.searchBox = '';
    this.dataSource.makeFilter('');
  }

}
