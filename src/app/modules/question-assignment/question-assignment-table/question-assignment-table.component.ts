import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/util/components/confirm-delete/confirm-delete.component';
import { ConfirmDeleteService } from 'src/app/util/components/confirm-delete/services/confirm-delete.service';
import { Assignment } from 'src/app/util/models/assignment';
import { QuestionAssignment } from 'src/app/util/models/question-assignment';
import { Question } from 'src/app/util/models/questions';

import { AssignmentService } from '../../assignment/services/assignment.service';
import { QuestionAssignmentService } from './../services/question-assignment.service';

@Component({
  selector: 'app-question-assignment-table',
  templateUrl: './question-assignment-table.component.html',
  styleUrls: ['./question-assignment-table.component.scss'],
})
export class QuestionAssignmentTableComponent implements OnInit {
  assignmentTitle = '';
  assignment!: Assignment;
  associateQuestionToAssignment$!: Observable<QuestionAssignment[]>;
  availableQuestions!: Question[];
  modalRef?: BsModalRef;
  questionField = new FormControl();

  constructor(
    private assignmentService: AssignmentService,
    private location: Location,
    private questionAssignmentService: QuestionAssignmentService,
    private toaster: ToastrService,
    private confirmDeleteService: ConfirmDeleteService
  ) {
    this.assignmentService
      .assignmentAsObservable()
      .subscribe((response: Assignment) => {
        this.assignment = response;
      });
  }

  ngOnInit(): void {
    this.assignmentTitle = this.assignment.title;

    this.refresh();
  }

  refresh() {
    this.associateQuestionToAssignment$ = this.questionAssignmentService
      .listQuestions(this.assignment.idAssignment)
      .pipe(
        catchError(() => {
          this.modalRef?.hide();
          this.toaster.error('There are no questions associated with the exam');
          return of([]);
        })
      );

    this.questionAssignmentService
      .findQuestionsByCourseAndAssignment(
        this.assignment.course.idCourse,
        this.assignment.idAssignment
      )
      .subscribe((response: Question[]) => {
        this.availableQuestions = response;
      });
  }

  onAddQuestion() {
    let questionIdToExam = this.questionField.value;
    let numberQuestions: number = 0;

    this.associateQuestionToAssignment$.subscribe(
      (response: QuestionAssignment[]) => {
        numberQuestions = response.length;
      }
    );

    let questionToExam;

    for (let question of this.availableQuestions) {
      if (question.idQuestion == questionIdToExam) {
        questionToExam = question;
      }
    }

    let questionAssignmenteToSave = {
      grade: 100 / (numberQuestions + 1),
      assignment: this.assignment,
      question: questionToExam,
    };

    this.questionAssignmentService
      .addQuestionAssignment(questionAssignmenteToSave)
      .subscribe({
        next: () => {
          this.toaster.success(
            'Successfully Associate Question to Assignment!'
          );
        },
        error: () => {
          this.toaster.error(
            'Error while trie Associate Question to Assignment'
          );
        },
        complete: () => {
          this.availableQuestions = [];
          this.questionField.reset();
          this.refresh();
        },
      });
  }

  onDelete(questionAssignment: QuestionAssignment) {
    const initialState: ModalOptions = {
      initialState: {
        name: questionAssignment.question.title,
        class: 'modal-sm',
      },
    };
    const bsModalRef: BsModalRef =
      this.confirmDeleteService.showConfirmDialog(initialState);

    ConfirmDeleteComponent.confirmAsObservable().subscribe(
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.questionAssignmentService.delete(questionAssignment.idQuestionAssignment).subscribe({
            next: () => this.toaster.success('Successfully Deleted QuestionAssignment!'),
            error: () =>
              this.toaster.error('Error Deleting QuestionAssigment, Try Again!'),
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
