import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Question } from 'src/app/util/models/questions';

import { QuestionAssignment } from './../../../util/models/question-assignment';

@Injectable({
  providedIn: 'root',
})
export class QuestionAssignmentService {
  private readonly API_URL =
    'http://localhost:8080/api/professor/course/assignment/questionassignment';

  constructor(private http: HttpClient) {}

  listQuestions(idAssignment: number) {
    return this.http
      .get<QuestionAssignment[]>(`${this.API_URL}/list/${idAssignment}`)
      .pipe(tap(console.log), first());
  }

  findQuestionsByCourseAndAssignment(courseId: number, assignmentId: number) {
    return this.http
      .get<Question[]>(`${this.API_URL}/list/${courseId}/${assignmentId}`)
      .pipe(first());
  }

  addQuestionAssignment(questionAssignment: Partial<QuestionAssignment>) {
    return this.http
      .post(`${this.API_URL}`, {
        grade: questionAssignment.grade,
        question: questionAssignment.question,
        assignment: questionAssignment.assignment,
      })
      .pipe(first());
  }

  delete(questionAssignmentId: number){
    return this.http.delete(`${this.API_URL}/${questionAssignmentId}`).pipe(first());
  }
}
