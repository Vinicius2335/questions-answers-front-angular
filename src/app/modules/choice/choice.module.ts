import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from 'src/app/util/util.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoiceRoutingModule } from './choice-routing.module';
import { ChoiceComponent } from './choice-table/choice.component';


@NgModule({
  declarations: [
    ChoiceComponent
  ],
  imports: [
    CommonModule,
    ChoiceRoutingModule,
    UtilModule,
    ReactiveFormsModule
  ]
})
export class ChoiceModule { }
