import { Component, OnInit, Input, OnChanges, AfterContentChecked, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { EasySpinnerService } from './easy-spinner.service';
import { EasySpinner } from './model';

@Component({
  selector: 'easy-spinner',
  templateUrl: './easy-spinner.component.html',
  styleUrls: ['./easy-spinner.component.scss']
})
export class EasySpinnerComponent implements OnInit, AfterContentChecked, OnChanges {

  @Input() name: string = 'default';
  @Input() text: string = 'Loading...';
  @Input() image: string = '';
  constructor(private easySpinnerService: EasySpinnerService,
              private cdRef : ChangeDetectorRef) { 
    
      this.easySpinnerService.easySpinnerHide.subscribe((val: EasySpinner) => {
        const ele = (document.getElementById(val.name + 'easy-spinner') as HTMLElement);
        if (ele) {
          ele.style.display = val.show ? 'block' : 'none';
        }
      });  
  }

  ngOnInit() {

  }

  ngAfterContentChecked() : void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name && changes.name.currentValue) {
      this.name = changes.name.currentValue;
    }
  }

}
