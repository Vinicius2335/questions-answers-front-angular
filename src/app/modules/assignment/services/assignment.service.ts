import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Assignment } from 'src/app/util/models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private readonly API_URL =
    'http://localhost:8080/api/professor/course/assignment';

  constructor(private http: HttpClient) {}

  getListAssignments(idCourse: number) {
    return this.http
      .get<Assignment[]>(`${this.API_URL}/list/${idCourse}/?title=`)
      .pipe(tap(console.log), first());
  }

  // findById(id: number) {
  //   return this.http.get<Choice>(`${this.API_URL}/${id}`).pipe(first());
  // }

  private insertAssignment(assignment: Partial<Assignment>) {
    return this.http
      .post(this.API_URL, {
        title: assignment.title,
        course: assignment.course
      })
      .pipe(first());
  }

  private updatedAssignment(assignment: Partial<Assignment>) {
    return this.http
      .put(`${this.API_URL}/${assignment.idAssignment}`, {
        title: assignment.title,
        course: assignment.course
      })
      .pipe(first());
  }

  saveAssignment(assignment: Partial<Assignment>) {
    if (assignment.idAssignment != 0 && assignment.idAssignment != null) {
      return this.updatedAssignment(assignment);
    } else {
      return this.insertAssignment(assignment);
    }
  }

  deleteAssignment(id: number){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  }

}
