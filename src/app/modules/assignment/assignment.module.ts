import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from './../../util/util.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentTableComponent } from './assignment-table/assignment-table.component';
import { AssignmentFormComponent } from './components/assignment-form/assignment-form.component';


@NgModule({
  declarations: [
    AssignmentTableComponent,
    AssignmentFormComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    ReactiveFormsModule,
    UtilModule
  ]
})
export class AssignmentModule { }
