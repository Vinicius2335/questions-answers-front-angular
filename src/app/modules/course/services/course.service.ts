import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { Course } from 'src/app/util/models/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly API_URL = 'http://localhost:8080/api/professor/course';
  course!: Course;
  public courseSubject = new BehaviorSubject<Course>(this.course);

  constructor(private http: HttpClient) {}

  getListCourse() {
    return this.http.get<Course[]>(`${this.API_URL}/list?name=`).pipe(first());
  }

  findByNameCourses(name: string) {
    return this.http.get<Course[]>(`${this.API_URL}/list?name=${name}`).pipe(first());
  }

  findById(id: number) {
    return this.http.get<Course>(`${this.API_URL}/${id}`).pipe(first());
  }

  private insertCourse(course: Partial<Course>) {
    return this.http.post(this.API_URL, { name: course.name }).pipe(first());
  }

  private updatedCourse(id: number, course: Partial<Course>) {
    return this.http
      .put(`${this.API_URL}/${id}`, { name: course.name })
      .pipe(first());
  }

  saveCourse(course: Partial<Course>) {
    if (course.idCourse != 0 && course.idCourse != null) {
      return this.updatedCourse(course.idCourse, course);
    } else {
      return this.insertCourse(course);
    }
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  }

  courseAsObservable(): Observable<Course> {
    return this.courseSubject.asObservable();
  }
}
