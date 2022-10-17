import { catchError, EMPTY, Observable, of, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/util/models/courses';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses$!: Observable<Course[]>;
  error$ = new Subject<boolean>();

  constructor(
    private courseService: CourseService,
    private toaster: ToastrService
    ) {
      this.refresh();
  }

  refresh(){
    this.courses$ = this.courseService.getListCourse().pipe(
      catchError(() => {
        this.error$.next(true);
        this.toaster.error('Não foi possivel carregar a lista de Courses');
        return EMPTY;
      })
    );
  }

  ngOnInit() {
  }

}
