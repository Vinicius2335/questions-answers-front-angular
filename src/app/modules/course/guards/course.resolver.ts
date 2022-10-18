import { CourseService } from './../services/course.service';
import { Course, Professor } from './../../../util/models/courses';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {
  professor!: Professor;

  constructor(private courseService: CourseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course | Observable<Course> | Promise<Course>{
    if (route.params && route.params['id']){
      return this.courseService.findById(route.params['id']);
    }

    return of({
      idCourse: 0,
      name: '',
      enabled: true,
      professor: this.professor
    });
  }
}
