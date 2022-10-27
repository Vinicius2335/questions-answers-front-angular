import { ToastrService } from 'ngx-toastr';
import { QuestionService } from './../services/question.service';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, Subject, Subscription } from 'rxjs';
import { Course } from 'src/app/util/models/courses';

import { CourseService } from './../../course/services/course.service';
import { Question } from 'src/app/util/models/questions';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  course!: Course;
  id!: number;
  inscricao!: Subscription;
  questions$!: Observable<Question[]>;
  error$ = new Subject<boolean>();

  modalRef?: BsModalRef;
  @ViewChild('loading') spinner!: TemplateRef<any>;

  constructor(
    private courseService: CourseService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location,
    private toaster: ToastrService
  ) {
    this.courseService.courseIdAsObservable().subscribe((response: number) => {
      this.id = response;
    });
  }

  ngOnInit(): void {
    this.courseService.findById(this.id).subscribe((response: any) => {
      this.course = response;
    });

    if(this.id != 0){
      this.refresh();
    }
  }

  refresh() {
    this.questions$ = this.questionService.getListQuestions(this.id).pipe(
      catchError(() => {
        this.modalRef?.hide();
        this.error$.next(true);
        this.toaster.error('Unable to load the question list');
        this.location.back();
        return EMPTY;
      })
    );
  }

  onCancel() {
    this.location.back();
  }

  // NOTE: NÃO ESQUECER DESSES METODOS AKI
  onNew() {}

  onEdit(question: Question) {}

  onDelete(question: Question) {}
}
