import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

import { Assignment } from '../../../../util/models/assignment';
import { Question } from '../../../../util/models/questions';
import { QuestionAssignmentService } from '../../services/question-assignment.service';
import { QuestionAssignment } from './../../../../util/models/question-assignment';

@Component({
  selector: 'app-question-assignment-form',
  templateUrl: './question-assignment-form.component.html',
  styleUrls: ['./question-assignment-form.component.scss']
})
export class QuestionAssignmentFormComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  availableQuestions!: Question[];
  questionAssignment!: QuestionAssignment;
  assignment!: Assignment;
  msgSuccess = '';
  msgError = '';

  form = this.formBuilder.group({
    idQuestionAssignment: [0, [Validators.required]],
    question: ['', [Validators.required]],
    grade: [0, [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private questionAssignmentService: QuestionAssignmentService,
    private toaster: ToastrService,
    public bsModalRef: BsModalRef
    ) { }

  ngOnInit(): void {
    if (this.questionAssignment.idQuestionAssignment != null && this.questionAssignment.grade != null) {
      this.form.controls.idQuestionAssignment.setValue(this.questionAssignment.idQuestionAssignment);
      this.form.controls.grade.setValue(this.questionAssignment.grade);
      this.form.controls.question.setValue(this.questionAssignment.question.title);
    }

    if (this.form.controls.idQuestionAssignment.value == 0){
      this.refresh();
    }
  }

  refresh(){
    this.questionAssignmentService
    .findQuestionsByCourseAndAssignment(
      this.assignment.course.idCourse,
      this.assignment.idAssignment
    )
    .subscribe((response: Question[]) => {
      this.availableQuestions = response;
    });
  }

  onSubmit() {
    this.responseMsgs();

    let questionAssignmantId = this.form.controls.idQuestionAssignment.value;
    let questionTitleToExam = this.form.controls.question.value;
    let gradeValue = this.form.controls.grade.value;
    let questionToExam!: Question;

    if (this.form.controls.idQuestionAssignment.value == 0)
    for (let question of this.availableQuestions) {
      if (question.title == questionTitleToExam) {
        questionToExam = question;
      }
    } else {
      questionToExam = this.questionAssignment.question;
    }

    let questionAssignmentToSave: Partial<QuestionAssignment> = {
      idQuestionAssignment: questionAssignmantId,
      grade: gradeValue,
      question: questionToExam,
      assignment: this.assignment
    };

    this.questionAssignmentService
      .saveQuestionAssignment(questionAssignmentToSave)
      .subscribe({
        next: () => {
          this.toaster.success(this.msgSuccess);
          QuestionAssignmentFormComponent.dialogSubject.next(true);
        },
        error: () => {
          this.toaster.error(this.msgError);
        },
        complete: () => this.bsModalRef?.hide(),
      });
  }

  onCancel() {
    this.bsModalRef.hide();
  }


  responseMsgs() {
    this.msgSuccess = 'Successfully Associate Question to Assignment!';
    this.msgError = 'Error while trie Associate Question to Assignment, Try Again!';

    if (this.form.controls.idQuestionAssignment.value != 0) {
      this.msgSuccess = 'QuestionAssignment Updated Successfully!';
      this.msgError = 'Error while trie edit QuestionAssignment, Try Again!';
    }
  }

  static assignmentFormAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }

  static questionAssignmentFormAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }

}
