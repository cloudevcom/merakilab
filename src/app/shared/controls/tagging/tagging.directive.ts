import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class TaggingDirective implements OnInit {

  @Input('appHighlight') position: string;
  @Input() defaultColor: string;

  constructor(private el: ElementRef) { }
eles: [] = [];

  ngOnInit() {
    if (this.el.nativeElement.classList.contains('tag-before')){
      if( this.position === 'start') 
          this.el.nativeElement.style['border-color'] = '#9c27b0 #9c27b0 #9c27b0 #9c27b0';
    }

    if(this.position === 'end'){
       this.el.nativeElement.style['cursor'] = 'default';
       this.el.nativeElement.style['content'] = 'n';
       this.el.nativeElement.style['opacity'] = 'unset';
       this.el.nativeElement.classList.add('active');
    }
  }
}
