import { Component, OnInit, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Base } from '../../../shared/bases/base';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NotifyService } from '../../services/notify.service';

declare var $: any;

@Component({
  selector: 'app-login-cmp',
  templateUrl: './login.component.html'
})

export class LoginComponent extends Base implements OnInit, AfterViewInit {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public model: any = {};
  public returnUrl: string;
  public formLogin: FormGroup;
  invalidCredentialds = false;
  captchaToken;
  hide = true;
  constructor(private element: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotifyService,
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,) {
    super();
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {




    this.validations();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] === undefined ||
      this.route.snapshot.queryParams['returnUrl'] === '/' ||
      this.route.snapshot.queryParams['returnUrl'] === '' ? '/home' : this.route.snapshot.queryParams['returnUrl'];

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

  }


  validations() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      //captcha: ['', Validators.required]
    });
  }


  async login() {
    if (this.formLogin.valid) {
      this.afAuth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password)
      .then((result) => {
        console.log('result :>> ', result);
        result.user.getIdToken().then(token =>{
          localStorage.setItem("token", token);
          this.router.navigate(['/home']);
        })
      })
      .catch(error => {
          this.notifyService.notifyError(error);
      });

    } else {
      this.validateAllFormFields(this.formLogin);
    }
  }
}
