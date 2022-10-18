import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { CourseService } from './../../services/course.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  private static dialogSubject = new BehaviorSubject<boolean>(false);
  private msgSuccess!: string;
  private msgError!: string;

  form = this.formBuilder.group({
    idCourse: [0, [Validators.required]],
    name: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CourseService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.courseMsg();

    this.courseService.insertCourse(this.form.value).subscribe({
      next: () => {
        this.toastr.success(this.msgSuccess);
        CourseFormComponent.dialogSubject.next(true);
      },
      error: () => this.toastr.error(this.msgError),
      complete: () => this.bsModalRef?.hide()
    });
  }

  onCancel(){
    this.bsModalRef.hide();
  }

  courseMsg(){
    this.msgSuccess = 'Curso Salvo com Sucesso!';
    this.msgError = 'Erro ao Salvar Curso, Tente Novamente!';

    if (this.form.value.idCourse != 0) {
      this.msgSuccess = 'Curso Atualizado com Sucesso!';
      this.msgError = 'Erro ao Atualizar Curso, Tente Novamente!';
    }
  }

  static authAsObservable(): Observable<boolean> {
    return this.dialogSubject.asObservable();
  }

}
