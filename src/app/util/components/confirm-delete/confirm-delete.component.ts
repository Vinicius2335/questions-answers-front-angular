import { ToastrService } from 'ngx-toastr';
import { Course } from './../../models/courses';
import { CourseService } from './../../../modules/course/services/course.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  course!: Course;

  constructor(
    public bsModalRef: BsModalRef,
    private courseService: CourseService,
    private toastrService :ToastrService
    ) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.bsModalRef.hide();
  }

  onConfirm(){
    this.courseService.deleteCourse(this.course.idCourse).subscribe({
      next: () => this.toastrService.success('Successfully Deleted Course!'),
      error: () => this.toastrService.error('Error Deleting Course, Try Again!'),
      complete: () => {
        ConfirmDeleteComponent.dialogSubject.next(true);
        this.bsModalRef.hide();
      }
    });
  }

  static authAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }

}

// TODO: deixar o dialog genérico
