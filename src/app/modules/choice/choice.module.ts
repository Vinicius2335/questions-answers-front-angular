import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from 'src/app/util/util.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoiceRoutingModule } from './choice-routing.module';
import { ChoiceComponent } from './choice-table/choice.component';
import { ChoiceFormComponent } from './components/choice-form/choice-form.component';


@NgModule({
  declarations: [
    ChoiceComponent,
    ChoiceFormComponent
  ],
  imports: [
    CommonModule,
    ChoiceRoutingModule,
    UtilModule,
    ReactiveFormsModule
  ]
})
export class ChoiceModule { }
