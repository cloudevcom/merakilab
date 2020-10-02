import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { EasySpinnerService } from '../../shared/controls/easy-spinner/easy-spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingScreenInterceptor  implements HttpInterceptor {

    activeRequests = 0;

    skippUrls = [
        'authrefresh',
        'estate\\?page.+'
      ];

    constructor(private spinner: EasySpinnerService) {
    }
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let displayLoadingScreen = true;
        // let positionIndicator: string = 'api/';
        // let position = req.url.indexOf(positionIndicator);
        // let destination: string = req.url.substr(position + positionIndicator.length);
        
        for (const skippUrl of this.skippUrls) { 
            if (new RegExp(skippUrl).test(req.url)) {
              displayLoadingScreen = false;
              break;
            }
          }

          if (displayLoadingScreen) {
            if (this.activeRequests === 0) {
              if (new RegExp('/api/menu').test(req.url)) {
                this.spinner.show('menu');
              } else if (new RegExp('/o/token').test(req.url)) {
                this.spinner.show('login');
              } else if (new RegExp('/api/cuenta').test(req.url)) {
                this.spinner.show('cuenta');
              } else {
                this.spinner.show('general');
              }
              this.spinner.show();
            }

            this.activeRequests ++;

            return next.handle(req).pipe(
              finalize(() => {
                this.activeRequests --;
                if (this.activeRequests === 0) {
                  if (new RegExp('/api/menu').test(req.url)) {
                    this.spinner.hide('menu');
                  } else if (new RegExp('/o/token').test(req.url)) {
                    this.spinner.hide('login');
                  } else if (new RegExp('/api/cuenta').test(req.url)) {
                    this.spinner.hide('cuenta');
                  } else {
                    this.spinner.hide('general');
                  }
                  this.spinner.hide();
                }
              })
            );
          } else {
            return next.handle(req);
          }
    }
}