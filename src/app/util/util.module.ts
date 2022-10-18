import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    SpinnerLoadingComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SpinnerLoadingComponent,
    ConfirmDeleteComponent
  ]
})
export class UtilModule { }
