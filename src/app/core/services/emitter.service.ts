import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DivisionPropiedad } from 'src/app/shared/enums/division';

@Injectable()
export class EmitterService {

    private  u = JSON.parse(localStorage.getItem('currentUserPH'));
    private messageSource = new BehaviorSubject(this.u.propiedad_horizontal);
    //private captchaControl = new BehaviorSubject(null);
    private infoAddPropertySource = new BehaviorSubject(null);
    currentMessage = this.messageSource.asObservable();
    currentInfoAddProperty = this.infoAddPropertySource.asObservable();
    public activeLang = 'apartamentos';
    public captchaControl;

    constructor(private translate: TranslateService) {
     }

    changePropertie(data: any) {
        this.messageSource.next(data);
       // this.stablishLang(data.division_id);
    }

    changeInfoAddProperty(data: any) {
        this.infoAddPropertySource.next(data);
    }

    private stablishLang(division_id: number) {
        switch (division_id) {
            case DivisionPropiedad.Apartamentos:
                this.translate.setDefaultLang('apartamentos');
                break;
            case DivisionPropiedad.Casas:
                this.translate.setDefaultLang('casas');
                break;
            case DivisionPropiedad.Oficinas:
                this.translate.setDefaultLang('oficinas');
                break;
            case DivisionPropiedad.CasasApartamentos:
                this.translate.setDefaultLang('casasapartamentos');
                break;
        }
    }
}
