import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/app.module';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SearchBoxComponent],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchBoxModule { }