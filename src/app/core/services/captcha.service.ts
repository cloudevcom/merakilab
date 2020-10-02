import { Injectable, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
declare const $: any;

@Injectable()
export class CaptchaService {

   private recaptchaToken = new BehaviorSubject(null);
   currentCaptchaToken = this.recaptchaToken.asObservable();
   private recaptchaControl;

    captchaToken(data: any) {
        this.recaptchaToken.next(data);        
    }

   

    setRecaptchaControl(recaptcha: any) {
       this.recaptchaControl = recaptcha;
    }

    getRecaptchaControl() {
        return  this.recaptchaControl;
    }
}
