import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentTableComponent } from './assignment-table/assignment-table.component';

const routes: Routes = [{ path: '', component: AssignmentTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentRoutingModule {}
