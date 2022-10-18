import { CourseFormComponent } from './../components/course-form/course-form.component';
import { catchError, EMPTY, Observable, of, Subject } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/util/models/courses';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courses$!: Observable<Course[]>;
  error$ = new Subject<boolean>();

  //spinner
  modalRef?: BsModalRef;
  @ViewChild('loading') spinner!: TemplateRef<any>;

  constructor(
    private courseService: CourseService,
    private toaster: ToastrService,
    private modalService: BsModalService
  ) {
    this.refresh();

    // atualiza a lista de cursos apos salvar/atualizar curso for um sucesso
    CourseFormComponent.authAsObservable().subscribe(
      (isSavedSuccessful: boolean) => {
        if (isSavedSuccessful) {
          this.refresh();
        }
      }
    );
  }

  refresh() {
    this.courses$ = this.courseService.getListCourse().pipe(
      catchError(() => {
        this.modalRef?.hide();
        this.error$.next(true);
        this.toaster.error('Não foi possivel carregar a lista de Courses');
        return EMPTY;
      })
    );
  }

  ngOnInit() {}

  openModal() {
    this.modalRef = this.modalService.show(
      this.spinner,
      Object.assign({}, { class: 'modal-sm' })
    );
  }

  onNew() {
    this.modalRef = this.modalService.show(
      CourseFormComponent,
      Object.assign({})
    );
  }
}
