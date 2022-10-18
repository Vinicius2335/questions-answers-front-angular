import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Course } from 'src/app/util/models/courses';
import { CourseFormComponent } from '../course-form.component';

@Injectable({
  providedIn: 'root'
})
export class CourseFormService {
  constructor(private modalService: BsModalService) {}

  showSaveDialog(course: any) {
    const bsModalRef: BsModalRef = this.modalService.show(CourseFormComponent, course);
    // (<CourseFormComponent>bsModalRef.content).course = course;
  }

}
