import { QuestionAssignmentFormComponent } from './../components/question-assignment-form/question-assignment-form.component';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/util/components/confirm-delete/confirm-delete.component';
import { ConfirmDeleteService } from 'src/app/util/components/confirm-delete/services/confirm-delete.service';
import { Assignment } from 'src/app/util/models/assignment';
import { QuestionAssignment } from 'src/app/util/models/question-assignment';

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
  
  modalRef?: BsModalRef;

  constructor(
    private assignmentService: AssignmentService,
    private location: Location,
    private questionAssignmentService: QuestionAssignmentService,
    private toaster: ToastrService,
    private confirmDeleteService: ConfirmDeleteService,
    private modalService: BsModalService,
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

    QuestionAssignmentFormComponent.questionAssignmentFormAsObservable().subscribe(
      (isSavedSuccessful: boolean) => {
        if (isSavedSuccessful) {
          this.refresh();
        }
      }
    );
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
  }

  onNew(){
    const initialState: ModalOptions = {
      initialState: {
        assignment: this.assignment,
        class: 'modal-sm'
      },
    };

    this.modalRef = this.modalService.show(
      QuestionAssignmentFormComponent,
      initialState
    );
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
