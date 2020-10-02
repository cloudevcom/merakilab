import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CaptchaService } from 'src/app/core/services/captcha.service';

@Component({
  selector: 'app-layout',
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit, AfterViewInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  mobile_menu_visible: any = 0;
  private _router: Subscription;
  private subscription: Subscription;
   @ViewChild('captchaRef') captchaRef;
  
  constructor(private router: Router, private element: ElementRef,
    private captchaService: CaptchaService) {
      this.sidebarVisible = false;
  }

  ngAfterViewInit(): void {
    //this.captchaService.setRecaptchaControl(this.captchaRef);
  }

  ngOnInit(){ }

  submit(token:string){
   //this.captchaService.captchaToken(token)
  }
    
}
