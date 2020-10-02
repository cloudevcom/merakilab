import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta, APIResponse} from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  public baseUrl: string;
  constructor(private http: HttpClient,
              private dialogRef: MatDialog) {
    this.baseUrl =  environment.endpoint;
  }

  GET<Response>(url: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.baseUrl + url, {headers: this.header()});
  }

  POST<APIResponse>(url: string, data: any): Observable<APIResponse>  {
    return this.http.post<APIResponse>(this.baseUrl + url, data, {headers: this.header()});
  }

  PUTFORMDATA<APIResponse>(url: string, data: any): Observable<APIResponse>  {
    return this.http.put<APIResponse>(this.baseUrl + url, data, {headers: this.headerFormData()});
  }

  POSTFORMDATA<APIResponse>(url: string, data: FormData): Observable<APIResponse>  {
    return this.http.post<APIResponse>(this.baseUrl + url, data, {headers: this.headerFormData()});
  }

  PUT<APIResponse>(url: string, data: any): Observable<APIResponse>  {
    return this.http.put<APIResponse>(this.baseUrl + url, data, {headers: this.header()});
  }

  DELETE<T>(url: string): Promise<Respuesta<T>> {
    return this.http.delete<Respuesta<T>>(this.baseUrl + url, {headers: this.header()})
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
    const tokenObj = JSON.parse(localStorage.getItem('tokenPH'));
    if (tokenObj.data.access_token) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + tokenObj.data.access_token);
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }
  }

  private headerFormData() {
    const tokenObj = JSON.parse(localStorage.getItem('tokenPH'));
    if (tokenObj.data.access_token) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + tokenObj.data.access_token);
        headers.append('Content-Type','multipart/form-data');
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
