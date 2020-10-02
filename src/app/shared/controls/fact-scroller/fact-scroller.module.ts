import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FactScrollerComponent } from './fact-scroller.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  imports: [
    CommonModule,
    ScrollingModule
  ],
  declarations: [FactScrollerComponent],
  entryComponents: [FactScrollerComponent],
  exports: [FactScrollerComponent],
  schemas: []
})
export class FactScrollerModule { }
