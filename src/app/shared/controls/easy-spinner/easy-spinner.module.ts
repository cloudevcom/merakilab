import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasySpinnerComponent } from './easy-spinner.component';
import { EasySpinnerService } from './easy-spinner.service';

@NgModule({
  declarations: [EasySpinnerComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [EasySpinnerComponent],
  exports: [EasySpinnerComponent],
  providers: [EasySpinnerService]
})
export class EasySpinnerModule { }
