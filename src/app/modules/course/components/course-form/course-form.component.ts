import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/util/models/courses';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  private msgSuccess!: string;
  private msgError!: string;

  course: Partial<Course> = {
    idCourse: 0,
    name: '',
  };

  form = this.formBuilder.group({
    idCourse: [0, [Validators.required]],
    name: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CourseService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    if (this.course.idCourse != null && this.course.name != null) {
      this.form.controls.idCourse.setValue(this.course.idCourse);
      this.form.controls.name.setValue(this.course.name);
    }
  }

  onSubmit() {
    this.courseMsg();

    this.courseService.saveCourse(this.form.value).subscribe({
      next: () => {
        this.toastr.success(this.msgSuccess);
        CourseFormComponent.dialogSubject.next(true);
      },
      error: () => this.toastr.error(this.msgError),
      complete: () => this.bsModalRef?.hide(),
    });
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  courseMsg() {
    this.msgSuccess = 'Successfully Saved Course!';
    this.msgError = 'Error Saving Course, Try Again!';

    if (this.form.value.idCourse != 0) {
      this.msgSuccess = 'Course Updated Successfully!';
      this.msgError = 'Error Refresh Course, Try Again!';
    }
  }

  static courseFormAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }
}
