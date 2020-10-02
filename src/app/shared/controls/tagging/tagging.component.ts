import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tagging',
  templateUrl: './tagging.component.html',
  styleUrls: ['./tagging.component.scss']
})
export class TaggingComponent implements OnInit {

  @Input() text: string;
  @Input() position: string;
  @Input() navigateTo: String

  constructor() { }

  ngOnInit(): void {
  }

}
