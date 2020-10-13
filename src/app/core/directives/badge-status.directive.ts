import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBadgeStatus]'
})
export class BadgeStatusDirective  implements OnInit {

  @Input('appBadgeStatus') status: string;

  constructor(private renderer: Renderer2,
     private el: ElementRef) {

  }

  ngOnInit(): void {
    switch (this.status) {
      case 'Untested':
        this.renderer.setAttribute(this.el.nativeElement, 'class',  'badge badge-default');
        break;
      case 'Passed':
        this.renderer.setAttribute(this.el.nativeElement, 'class', 'badge badge-success');
        break;
      case 'Failed':
        this.renderer.setAttribute(this.el.nativeElement, 'class', 'badge badge-danger');
        break;
      case 'In Progress':
        this.renderer.setAttribute(this.el.nativeElement, 'class', 'badge badge-warning');
        break;
      default: 
        this.renderer.setAttribute(this.el.nativeElement, 'class',  'badge badge-default');
        break;
    }
  }

}
