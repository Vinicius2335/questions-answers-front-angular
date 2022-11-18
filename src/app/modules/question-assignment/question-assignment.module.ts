import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from 'src/app/util/util.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionAssignmentRoutingModule } from './question-assignment-routing.module';
import { QuestionAssignmentTableComponent } from './question-assignment-table/question-assignment-table.component';
import { QuestionAssignmentFormComponent } from './components/question-assignment-form/question-assignment-form.component';


@NgModule({
  declarations: [
    QuestionAssignmentTableComponent,
    QuestionAssignmentFormComponent
  ],
  imports: [
    CommonModule,
    QuestionAssignmentRoutingModule,
    UtilModule,
    ReactiveFormsModule
  ]
})
export class QuestionAssignmentModule { }
