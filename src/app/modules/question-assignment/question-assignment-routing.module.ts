import { QuestionAssignmentTableComponent } from './question-assignment-table/question-assignment-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: QuestionAssignmentTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionAssignmentRoutingModule { }
