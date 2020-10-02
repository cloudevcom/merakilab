import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {

  public baseUrl: string;
  constructor(private http: HttpClient,
              private router: Router,
              private dialogRef: MatDialog) {

    this.baseUrl =  'https://node-prorizontal.herokuapp.com';
  }

  async GET<T>(url: string, data: any = {}): Promise<Respuesta<T>> {
    // if (data) {
    //   data.format = 'json';
    // } else {
    //   data = {};
    //   data.format = 'json';
    // }
    return this.http.get<Respuesta<T>>(this.baseUrl + url, {headers: this.header(), params: data})
    .toPromise().then((response) => {
      return response;
    });
  }

  POST<T>(url: string, data: any): Promise<Respuesta<T>>  {
    return this.http.post<Respuesta<T>>(this.baseUrl + url, data, {headers: this.header()})
    .toPromise().then((response) => {
      return response;
    });
  }

  PUT<T>(url: string, data: any): Promise<Respuesta<T>>  {
    return this.http.put<Respuesta<T>>(this.baseUrl + url, data, {headers: this.header()})
    .toPromise().then((response) => {
      return response;
    });
  }

  DELETE<T>(url: string): Promise<Respuesta<T>> {
    return this.http.delete<Respuesta<T>>(this.baseUrl + url, {headers: this.header()})
    .toPromise().then((response) => {
      return response;
    });
  }

  POSTFORMDATA<T>(url: string, data: FormData): Promise<Respuesta<T>>  {
    return this.http.post<Respuesta<T>>(this.baseUrl + url, data, {headers: this.headerFormData()})
    .toPromise().then((response) => {
      return response;
    });
  }

  PUTFORMDATA<T>(url: string, data: FormData) {
    return this.http.put<Respuesta<T>>(this.baseUrl + url, data, {headers: this.headerFormData()})
    .toPromise().then((response) => {
      return response;
    });
  }

  POSTNOTOKEN<T>(url: string, data: any): Promise<Respuesta<T>>  {
    return this.http.post<Respuesta<T>>(this.baseUrl + url, data)
    .toPromise().then((response) => {
      return response;
    });
  }

  POSTFILEFORMDATA<T>(url: string, data: FormData): Promise<Respuesta<T>> {
    return this.http.post<Respuesta<T>>(this.baseUrl + url, data, {headers: this.headerFileFormData()})
    .toPromise().then((response) => {
      return response;
    });
  }

  EXPORTAR<T>(url: string) {
    window.open(this.baseUrl + url, '_blank');
  }

  private header() {
    // create authorization header with jwt token
    const tokenObj = JSON.parse(localStorage.getItem('tokenPH'));
    if (tokenObj.data.access_token) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + tokenObj.data.access_token);
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }
  }

  private headerFileFormData() {
    const tokenObj = JSON.parse(localStorage.getItem('tokenPH'));
    if (tokenObj.data.access_token) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + tokenObj.data.access_token);
        headers.append('Content-Type','multipart/form-data');
        return headers;
    }

  }

  private headerFormData() {
    // if (this.tokenExpirer) {
    //   this.dialogRef.closeAll();
    //   localStorage.removeItem('isLoggedinPH');
    //   this.router.navigate(['/login']);
    // }
    // create authorization header with jwt token
    const tokenObj = JSON.parse(localStorage.getItem('tokenPH'));
    if (tokenObj.access_token) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + tokenObj.access_token);
        return headers;
    }
  }

  get tokenExpirer(): boolean {
    const token = JSON.parse(localStorage.getItem('tokenPH'));
    if (!token) {
      this.dialogRef.closeAll();
      return true;
    }
    const expiracion: number = token.expires_in / 3600;
    const fechaInicial: number = new Date(localStorage.getItem('datePH')).getTime();
    const fechaFinal: number = new Date().getTime();
    const totalHoras = Math.abs(fechaFinal - fechaInicial) / 36e5;
    return totalHoras > expiracion;
  }

}
