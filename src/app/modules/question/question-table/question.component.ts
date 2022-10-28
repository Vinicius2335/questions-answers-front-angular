import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/util/components/confirm-delete/confirm-delete.component';
import { ConfirmDeleteService } from 'src/app/util/components/confirm-delete/services/confirm-delete.service';

import { Course } from '../../../util/models/courses';
import { Question } from '../../../util/models/questions';
import { CourseService } from '../../course/services/course.service';
import { QuestionFormComponent } from '../components/question-form/question-form.component';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  course!: Course;
  id!: number;
  questions$!: Observable<Question[]>;
  courseName: string = '';
  modalRef?: BsModalRef;

  constructor(
    private courseService: CourseService,
    private questionService: QuestionService,
    private location: Location,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private confirmDeleteService: ConfirmDeleteService,
    private router: Router
  ) {
    this.courseService.courseIdAsObservable().subscribe((response: number) => {
      this.id = response;
    });

    QuestionFormComponent.questionFormAsObservable().subscribe(
      (isSavedSuccessful: boolean) => {
        if (isSavedSuccessful) {
          this.refresh();
        }
      }
    );
  }

  ngOnInit(): void {
    this.courseService.findById(this.id).subscribe((response: any) => {
      this.course = response;
      this.courseName = response.name;
    });

    if (this.id != 0) {
      this.refresh();
    }
  }

  refresh() {
    this.questions$ = this.questionService.getListQuestions(this.id).pipe(
      catchError(() => {
        this.modalRef?.hide();
        this.toaster.error('Question list is empty');
        return of([]);
      })
    );
  }

  onCancel() {
    this.location.back();
  }

  onNew() {
    const initialState: ModalOptions = {
      initialState: {
        course: this.course,
      },
    };
    this.modalRef = this.modalService.show(QuestionFormComponent, initialState);
  }

  onEdit(questionEdit: Question) {
    const initialState: ModalOptions = {
      initialState: {
        course: this.course,
        question: questionEdit
      },
    };
    this.modalRef = this.modalService.show(QuestionFormComponent, initialState);
  }

  onDelete(question: Question) {
    const initialState: ModalOptions = {
      initialState: {
        name: question.title,
        class: 'modal-sm',
      },
    };
    const bsModalRef: BsModalRef =
      this.confirmDeleteService.showConfirmDialog(initialState);

    ConfirmDeleteComponent.confirmAsObservable().subscribe(
      (isConfirm: boolean) => {
        if (isConfirm) {
          console.log(question);
          this.questionService.deleteQuestion(question.idQuestion).subscribe({
            next: () => this.toaster.success('Successfully Deleted Question!'),
            error: () =>
              this.toaster.error('Error Deleting Question, Try Again!'),
            complete: () => {
              bsModalRef.hide();
              this.refresh();
            },
          });
        }
      }
    );

  }

  onChoice(question: Question) {
    this.questionService.questionIdSubject.next(question.idQuestion);
    this.router.navigate([`professor/course/question/choice`]);
  }

}

// TODO: CHOICE -> TABLE/ NEW/ EDIT
