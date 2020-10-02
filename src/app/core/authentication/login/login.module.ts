import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/app.module';
import { LoginRoutes } from './login.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [ 
        CommonModule,
        RouterModule.forChild(LoginRoutes),
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
     ],
    exports: [],
    providers: [],
})
export class LoginModule {}