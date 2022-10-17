import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from './../../util/util.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';

import { CourseRoutingModule } from './course-routing.module';
import { CourseFormComponent } from './components/course-form/course-form.component';

@NgModule({
  declarations: [CourseComponent, CourseFormComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    UtilModule,
    ReactiveFormsModule
  ],
})
export class CourseModule { }
