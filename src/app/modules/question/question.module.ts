import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question-table/question.component';
import { UtilModule } from 'src/app/util/util.module';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuestionComponent, QuestionFormComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    UtilModule,
    ReactiveFormsModule,
  ],
})
export class QuestionModule {}
