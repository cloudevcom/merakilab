import { Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./core/authentication/authentication.module').then(m => m.AuthenticationModule)
    }]
  },
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/modules.module').then(m => m.Modules)
      },
    ]
  }
];
