import { Course } from './../../../../util/models/courses';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from 'src/app/util/models/questions';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  private msgSuccess!: string;
  private msgError!: string;
  course!: Course;
  

  question: Partial<Question> = {
    idQuestion: 0,
    title: '',
  };

  form = this.formBuilder.group({
    idQuestion: [0, [Validators.required]],
    title: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private questionService: QuestionService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit(): void {
    if (this.question.idQuestion != null && this.question.title != null) {
      this.form.controls.idQuestion.setValue(this.question.idQuestion);
      this.form.controls.title.setValue(this.question.title);
    }
  }

  onSubmit() {
    this.questionMsg();

    let question: Partial<Question> = this.form.value;
    question.course = this.course;

    console.log(question);

    this.questionService.saveQuestion(question).subscribe({
      next: () => {
        this.toastr.success(this.msgSuccess);
        this.form.reset();
      },
      error: () => this.toastr.error(this.msgError),
      complete: () => {
        if(question.idQuestion != 0){
          this.bsModalRef.hide();
        }
        QuestionFormComponent.dialogSubject.next(true);
      },
    });
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  questionMsg() {
    this.msgSuccess = 'Successfully Saved Question!';
    this.msgError = 'Error Saving Question, Try Again!';

    if (this.form.value.idQuestion != 0) {
      this.msgSuccess = 'Question Updated Successfully!';
      this.msgError = 'Error Refresh Question, Try Again!';
    }
  }

  static questionFormAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }
}
