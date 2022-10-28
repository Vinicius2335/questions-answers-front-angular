import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { Choice } from 'src/app/util/models/choice';
import { Question } from 'src/app/util/models/questions';

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
  questionId!: number;
  choices$!: Observable<Choice[]>;
  modalRef?: BsModalRef;

  constructor(
    private questionService: QuestionService,
    private location: Location,
    private choiceService: ChoiceService,
    private toaster: ToastrService,
    private modalService: BsModalService,
  ) {
    this.questionService.questionIdObservable().subscribe((response: number) => {
      this.questionId = response;
    });
   }

  ngOnInit(): void {
    this.questionService.findById(this.questionId).subscribe((response: Question) => {
      this.question = response;
      this.questionTitle = response.title;
    });

    this.refresh();
  }

  refresh() {
    this.choices$ = this.choiceService.getListChoices(this.questionId).pipe(
      catchError(() => {
        this.modalRef?.hide();
        this.toaster.error('Choice list is empty');
        return of([]);
      })
    );
  }

  // NOTE: Não esquecer de implementar os botoes depois
  onNew(){}

  onEdit(choice: Choice) {}

  onDelete(choice: Choice) {}

  onCancel(){
    this.location.back();
  }

}
