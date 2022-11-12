import { UtilModule } from './../../util/util.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentTableComponent } from './assignment-table/assignment-table.component';


@NgModule({
  declarations: [
    AssignmentTableComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    UtilModule
  ]
})
export class AssignmentModule { }
