import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ControlsService, HttpService } from './core/services';

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  private _router: Subscription;
  public loading: Boolean = false;
  private themeWrapper = document.querySelector('body');
  constructor( private router: Router,
                  private controlService: ControlsService,
                  private translate: TranslateService,
                  private elementRef: ElementRef,
                  public http: HttpService,
                  ) {
                    this.translate.setDefaultLang('casas');
  }

    ngOnInit() {
      this.stablishGlobalTheme();
     

      

        this.elementRef.nativeElement.style.setProperty('--color', 'orange');
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
          const body = document.getElementsByTagName('body')[0];
          const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
          if (body.classList.contains('modal-open')) {
            body.classList.remove('modal-open');
            modalBackdrop.remove();
          }
        });
    }

    stablishGlobalTheme() {
      const indigo500 = '#260ede';
      const teal500 = '#260ede';
      //const u = JSON.parse(localStorage.getItem('currentUserPH'));
      // if (u.perfil.id === 23) {
      //   this.themeWrapper.style.setProperty('--navBackground', indigo500);
      //   this.themeWrapper.style.setProperty('--backgroundColor', indigo500);
      //   this.themeWrapper.style.setProperty('--borderColor', indigo500);
      // } else {
      //   this.themeWrapper.style.setProperty('--navBackground', teal500);
      //   this.themeWrapper.style.setProperty('--backgroundColor', teal500);
      //   this.themeWrapper.style.setProperty('--borderColor', teal500);
      // }
      
    }
}
