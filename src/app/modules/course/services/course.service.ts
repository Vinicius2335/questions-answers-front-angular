import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Course } from 'src/app/util/models/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  readonly API_URL = 'http://localhost:8080/api/professor/course';

  constructor(private http: HttpClient) { }

  getListCourse(){
    return this.http.get<Course[]>(`${this.API_URL}/list?name=`).pipe(
      first(),
      tap((t) => console.log('t :>> ', t))
    );
  }

  // NOTE: PAREI AKI
  insertCourse(name: string){
    return this.http.post(this.API_URL, name).pipe();
  }

}
