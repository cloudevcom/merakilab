import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModulesRoutes } from './modules.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModulesRoutes),
  ],
  declarations: [],
  providers:[],
  entryComponents: []
})
export class Modules {}
