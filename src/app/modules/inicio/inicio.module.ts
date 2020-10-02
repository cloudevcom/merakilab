import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MaterialModule } from 'src/app/app.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
