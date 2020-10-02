import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaggingComponent } from './tagging.component';
import { TaggingDirective } from './tagging.directive';


@NgModule({
  declarations: [TaggingComponent, TaggingDirective],
  imports: [
    CommonModule
  ],
  exports: [ TaggingComponent, TaggingDirective]
})
export class TaggingModule { }
