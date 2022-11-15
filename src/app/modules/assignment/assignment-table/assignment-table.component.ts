import { ConfirmDeleteService } from 'src/app/util/components/confirm-delete/services/confirm-delete.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { Assignment } from 'src/app/util/models/assignment';
import { AssignmentFormComponent } from '../components/assignment-form/assignment-form.component';

import { AssignmentService } from '../services/assignment.service';
import { Course } from './../../../util/models/courses';
import { CourseService } from './../../course/services/course.service';
import { ConfirmDeleteComponent } from 'src/app/util/components/confirm-delete/confirm-delete.component';
import { FormControl } from '@angular/forms';

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
  searchField = new FormControl();

  constructor(
    private couseService: CourseService,
    private assignmentService: AssignmentService,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private location: Location,
    private confirmDeleteService: ConfirmDeleteService
  ) {
    this.couseService.courseAsObservable().subscribe((response: Course) => {
      this.course = response;
    });

    AssignmentFormComponent.assignmentFormAsObservable().subscribe(
      (isSavedSuccessful: boolean) => {
        if (isSavedSuccessful) {
          this.refresh();
        }
      }
    );
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

  onSearch(){
    let value = this.searchField.value;
    this.assignment$ = this.assignmentService.findByTitleAssignments(this.course.idCourse, value).pipe(
      catchError(() => {
        this.modalRef?.hide();
        this.toaster.error('Assignment Not Found');
        return of([]);
      })
    );
  }

  onNew() {
    const initialState: ModalOptions = {
      initialState: {
        course: this.course,
      },
    };

    this.modalRef = this.modalService.show(
      AssignmentFormComponent,
      initialState
    );
  }

  onEdit(assignmentToEdit: Assignment) {
    const initialState: ModalOptions = {
      initialState: {
        assignment: assignmentToEdit,
        course: this.course,
      },
    };
    this.modalRef = this.modalService.show(AssignmentFormComponent, initialState);
  }

  onDelete(assignmentToDelete: Assignment) {
    const initialState: ModalOptions = {
      initialState: {
        name: assignmentToDelete.title,
        class: 'modal-sm',
      },
    };
    const bsModalRef: BsModalRef =
      this.confirmDeleteService.showConfirmDialog(initialState);

    ConfirmDeleteComponent.confirmAsObservable().subscribe(
      (isConfirm: boolean) => {
        if (isConfirm) {
          console.log(assignmentToDelete);
          this.assignmentService.deleteAssignment(assignmentToDelete.idAssignment).subscribe({
            next: () => this.toaster.success('Successfully Deleted Assignment!'),
            error: () =>
              this.toaster.error('Error Deleting Assignment, Try Again!'),
            complete: () => {
              bsModalRef.hide();
              this.refresh();
            },
          });
        }
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
