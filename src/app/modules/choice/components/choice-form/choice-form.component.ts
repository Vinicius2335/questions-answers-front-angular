import { Choice } from 'src/app/util/models/choice';
import { Question } from 'src/app/util/models/questions';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ChoiceService } from '../../services/choice.service';

@Component({
  selector: 'app-choice-form',
  templateUrl: './choice-form.component.html',
  styleUrls: ['./choice-form.component.scss']
})
export class ChoiceFormComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  private msgSuccess!: string;
  private msgError!: string;
  question!: Question;

  choice: Partial<Choice> = {
    idChoice: 0,
    title: '',
    correctAnswer: false
  };

  form = this.formBuilder.group({
    idChoice: [0, [Validators.required]],
    title: ['', [Validators.required]],
    correctAnswer: [false, [Validators.required]]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private choiceService: ChoiceService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    if (this.choice.idChoice != null && this.choice.title != null) {
      this.form.controls.idChoice.setValue(this.choice.idChoice);
      this.form.controls.title.setValue(this.choice.title);
      if(this.choice.correctAnswer != null){
        this.form.controls.correctAnswer.setValue(this.choice.correctAnswer);
      }
    }
  }

  onSubmit() {
    this.questionMsg();

    let choice: Partial<Choice> = this.form.value;
    choice.question = this.question;

    this.choiceService.saveChoice(choice).subscribe({
      next: () => {
        this.toastr.success(this.msgSuccess);
        this.form.reset();
      },
      error: () => this.toastr.error(this.msgError),
      complete: () => {
        if(choice.idChoice != 0){
          this.bsModalRef.hide();
        }
        ChoiceFormComponent.dialogSubject.next(true);
      },
    });
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  questionMsg() {
    this.msgSuccess = 'Successfully Saved Choice!';
    this.msgError = 'Error Saving Choice, Try Again!';

    if (this.form.value.idChoice != 0) {
      this.msgSuccess = 'Choice Updated Successfully!';
      this.msgError = 'Error Refresh Choice, Try Again!';
    }
  }

  static choiceFormAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }

}
