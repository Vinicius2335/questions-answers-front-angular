import { QuestionAssignment } from './../../../../util/models/question-assignment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NonNullableFormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assignment } from 'src/app/util/models/assignment';
import { Question } from 'src/app/util/models/questions';
import { QuestionAssignmentService } from '../../services/question-assignment.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-question-assignment-form',
  templateUrl: './question-assignment-form.component.html',
  styleUrls: ['./question-assignment-form.component.scss']
})
export class QuestionAssignmentFormComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  availableQuestions!: Question[];
  assignment!: Assignment;

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
    this.refresh();
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
    let questionTitleToExam = this.form.controls.question.value;
    let gradeValue = this.form.controls.grade.value;
    let questionToExam!: Question;

    for (let question of this.availableQuestions) {
      if (question.title == questionTitleToExam) {
        questionToExam = question;
      }
    }

    let questionAssignmentToSave: Partial<QuestionAssignment> = {
      grade: gradeValue,
      question: questionToExam,
      assignment: this.assignment
    };
    
    this.questionAssignmentService
      .addQuestionAssignment(questionAssignmentToSave)
      .subscribe({
        next: () => {
          this.toaster.success(
            'Successfully Associate Question to Assignment!'
          );
          QuestionAssignmentFormComponent.dialogSubject.next(true);
        },
        error: () => {
          this.toaster.error(
            'Error while trie Associate Question to Assignment'
          );
        },
        complete: () => this.bsModalRef?.hide(),
      });
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  static questionAssignmentFormAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }

}
