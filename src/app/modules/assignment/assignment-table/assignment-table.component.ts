import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { Assignment } from 'src/app/util/models/assignment';

import { AssignmentService } from '../services/assignment.service';
import { Course } from './../../../util/models/courses';
import { CourseService } from './../../course/services/course.service';

@Component({
  selector: 'app-assignment-table',
  templateUrl: './assignment-table.component.html',
  styleUrls: ['./assignment-table.component.scss'],
})
export class AssignmentTableComponent implements OnInit {
  course!: Course;
  courseName = '';
  assignment$!: Observable<Assignment[]>;
  modalRef?: BsModalRef;

  constructor(
    private couseService: CourseService,
    private assignmentService: AssignmentService,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private location: Location
  ) {
    this.couseService.courseAsObservable().subscribe((response: Course) => {
      this.course = response;
    });
  }

  ngOnInit(): void {
    this.courseName = this.course.name;

    this.refresh();
  }

  refresh() {
    this.assignment$ = this.assignmentService
      .getListAssignments(this.course.idCourse)
      .pipe(
        catchError(() => {
          this.modalRef?.hide();
          this.toaster.error('Assignment list is empty');
          return of([]);
        })
      );
  }

  onNew() {}

  onDelete(assignment: Assignment) {}

  onEdit(assignment: Assignment) {}

  onCancel() {
    this.location.back();
  }
}
