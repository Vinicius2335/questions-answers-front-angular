import { AssignmentService } from './../../services/assignment.service';
import { Assignment } from 'src/app/util/models/assignment';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/util/models/courses';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  private msgSuccess!: string;
  private msgError!: string;
  course!: Course;

  assignment: Partial<Assignment> = {
    idAssignment: 0,
    title: '',
    course: this.course,
  };

  form = this.formBuilder.group({
    idAssignment: [0, [Validators.required]],
    title: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private assignmentService: AssignmentService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    if (this.assignment.idAssignment != null && this.assignment.title != null) {
      this.form.controls.idAssignment.setValue(this.assignment.idAssignment);
      this.form.controls.title.setValue(this.assignment.title);
    }
  }

  onSubmit(){
    this.assignmentMsg();

    if(this.assignment.idAssignment == 0){
      this.assignment.course = this.course;
    }

    this.assignment.title = this.form.controls.title.value;

    this.assignmentService.saveAssignment(this.assignment).subscribe({
      next: () => {
        this.toastr.success(this.msgSuccess);
        AssignmentFormComponent.dialogSubject.next(true);
      },
      error: () => this.toastr.error(this.msgError),

      complete: () => this.bsModalRef?.hide(),
    });
  }

   onCancel() {
    this.bsModalRef.hide();
  }

  assignmentMsg() {
    this.msgSuccess = 'Successfully Saved Assignment!';
    this.msgError = 'Error Saving Assignment, Try Again!';

    if (this.form.value.idAssignment != 0) {
      this.msgSuccess = 'Assignment Updated Successfully!';
      this.msgError = 'Error Refresh Assignment, Try Again!';
    }
  }

  static assignmentFormAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }

}
