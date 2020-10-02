import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestcaseRoutes } from './testcase.routing';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(TestcaseRoutes),
 
  ]
})
export class TestcaseModule { }
