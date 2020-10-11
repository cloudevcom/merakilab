import { NgModule } from '@angular/core';
import { InterceptorProviders } from './interceptors/interceptors';
import {  AuthService, ControlsService, HttpService } from './services';
import { ConfigService } from './services/config.service';
import { EmitterService } from './services/emitter.service';
import { UtilitiesService } from './services/utilities.services';
import { NotifyService } from './services/notify.service';
import { CaptchaService } from './services/captcha.service';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { ApiService } from './services/api.service';
import { FetchServiceService } from './services/fetch-service.service';
import { FireStoreService } from './services/firebaseAPI.service';
import { ModuleAPI } from './firestoreAPI/module.api';
import { UserAPI } from './firestoreAPI/user.api';


@NgModule({
  imports: [],
  declarations: [],
  providers: [
    InterceptorProviders,
    AuthService,
    ControlsService,
    HttpService,
    ConfigService,
    EmitterService,
    UtilitiesService,
    NotifyService,
    CaptchaService,
    FetchServiceService,
    FireStoreService,
    ApiService,
    ModuleAPI,
    UserAPI,
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es'
    }
  ]
})
export class CoreModule { }
