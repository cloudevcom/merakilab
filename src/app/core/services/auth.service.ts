import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
    private router: Router,) { }
  
  public signOut(){
    localStorage.removeItem('storageData');
    this.afAuth.signOut();    
    this.router.navigate(['/authentication/login']);
  }
  

}
