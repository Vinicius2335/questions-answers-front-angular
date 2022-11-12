import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, of, Subject } from 'rxjs';
import { Course } from 'src/app/util/models/courses';

import { CourseService } from '../services/course.service';
import { ConfirmDeleteComponent } from './../../../util/components/confirm-delete/confirm-delete.component';
import { ConfirmDeleteService } from './../../../util/components/confirm-delete/services/confirm-delete.service';
import { CourseFormComponent } from './../components/course-form/course-form.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courses$!: Observable<Course[]>;

  //spinner
  modalRef?: BsModalRef;
  @ViewChild('loading') spinner!: TemplateRef<any>;

  constructor(
    private courseService: CourseService,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private confirmDeleteService: ConfirmDeleteService,
    private router: Router
  ) {
    this.refresh();

    // atualiza a lista de cursos apos salvar/atualizar curso for um sucesso
    CourseFormComponent.courseFormAsObservable().subscribe(
      (isSavedSuccessful: boolean) => {
        if (isSavedSuccessful) {
          this.refresh();
        }
      }
    );
  }

  refresh() {
    this.courses$ = this.courseService.getListCourse().pipe(
      catchError(() => {
        this.modalRef?.hide();
        this.toaster.error('Unable to load the courses list');
        return of([]);
      })
    );
  }

  ngOnInit() {}

  openModal() {
    this.modalRef = this.modalService.show(
      this.spinner,
      Object.assign({}, { class: 'modal-sm' })
    );
  }

  onNew() {
    this.modalRef = this.modalService.show(
      CourseFormComponent,
      Object.assign({})
    );
  }

  onEdit(course: Course) {
    const initialState: ModalOptions = {
      initialState: {
        course: course,
      },
    };
    this.modalRef = this.modalService.show(CourseFormComponent, initialState);
  }

  onDelete(course: Course) {
    const initialState: ModalOptions = {
      initialState: {
        name: course.name,
        class: 'modal-sm',
      },
    };
    const bsModalRef: BsModalRef =
      this.confirmDeleteService.showConfirmDialog(initialState);

    ConfirmDeleteComponent.confirmAsObservable().subscribe(
      (isConfirm: boolean) => {
        if (isConfirm) {
          console.log(course);
          this.courseService.deleteCourse(course.idCourse).subscribe({
            next: () => this.toaster.success('Successfully Deleted Course!'),
            error: () =>
              this.toaster.error('Error Deleting Course, Try Again!'),
            complete: () => {
              bsModalRef.hide();
              this.refresh();
            },
          });
        }
      }
    );
  }

  onQuestion(course: Course) {
    this.courseService.courseIdSubject.next(course.idCourse);
    this.router.navigate([`professor/course/question`]);
  }

  onAssignment(course: Course){
    this.courseService.courseSubject.next(course);
    this.router.navigate([`professor/course/assignment`]);
  }
}
