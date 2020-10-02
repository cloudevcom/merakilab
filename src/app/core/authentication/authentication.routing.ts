import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }

    ]
  }
];
