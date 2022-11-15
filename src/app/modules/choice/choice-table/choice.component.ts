import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/util/components/confirm-delete/confirm-delete.component';
import { ConfirmDeleteService } from 'src/app/util/components/confirm-delete/services/confirm-delete.service';
import { Choice } from 'src/app/util/models/choice';
import { Question } from 'src/app/util/models/questions';

import { ChoiceFormComponent } from '../components/choice-form/choice-form.component';
import { QuestionService } from './../../question/services/question.service';
import { ChoiceService } from './../services/choice.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  questionTitle = '';
  question!: Question;
  choices$!: Observable<Choice[]>;
  modalRef?: BsModalRef;

  constructor(
    private questionService: QuestionService,
    private location: Location,
    private choiceService: ChoiceService,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private confirmDeleteService: ConfirmDeleteService
  ) {
    this.questionService.questionObservable().subscribe((response: Question) => {
      this.question = response;
    });

    ChoiceFormComponent.choiceFormAsObservable().subscribe(
      (isSavedSuccessful: boolean) => {
        if (isSavedSuccessful) {
          this.refresh();
        }
      }
    );
   }

  ngOnInit(): void {
    this.questionTitle = this.question.title;

    this.refresh();
  }

  refresh() {
    this.choices$ = this.choiceService.getListChoices(this.question.idQuestion).pipe(
      catchError(() => {
        this.modalRef?.hide();
        this.toaster.error('Choice list is empty');
        return of([]);
      })
    );
  }

  onNew(){
    const initialState: ModalOptions = {
      initialState: {
        question: this.question,
      },
    };
    this.modalRef = this.modalService.show(ChoiceFormComponent, initialState);
  }

  onEdit(choiceToEdit: Choice) {
    const initialState: ModalOptions = {
      initialState: {
        question: this.question,
        choice: choiceToEdit
      },
    };
    this.modalRef = this.modalService.show(ChoiceFormComponent, initialState);
  }

  onDelete(choice: Choice) {
    const initialState: ModalOptions = {
      initialState: {
        name: choice.title,
        class: 'modal-sm',
      },
    };
    const bsModalRef: BsModalRef =
      this.confirmDeleteService.showConfirmDialog(initialState);

    ConfirmDeleteComponent.confirmAsObservable().subscribe(
      (isConfirm: boolean) => {
        if (isConfirm) {
          console.log(choice);
          this.choiceService.deleteChoice(choice.idChoice).subscribe({
            next: () => this.toaster.success('Successfully Deleted Choice!'),
            error: () =>
              this.toaster.error('Error Deleting Choice, Try Again!'),
            complete: () => {
              bsModalRef.hide();
              this.refresh();
            },
          });
        }
      }
    );
  }

  onCancel(){
    this.location.back();
  }

}

// TODO: e se deletarem a questão certa?
