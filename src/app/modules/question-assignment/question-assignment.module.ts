import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from 'src/app/util/util.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionAssignmentRoutingModule } from './question-assignment-routing.module';
import { QuestionAssignmentTableComponent } from './question-assignment-table/question-assignment-table.component';


@NgModule({
  declarations: [
    QuestionAssignmentTableComponent
  ],
  imports: [
    CommonModule,
    QuestionAssignmentRoutingModule,
    UtilModule,
    ReactiveFormsModule
  ]
})
export class QuestionAssignmentModule { }
