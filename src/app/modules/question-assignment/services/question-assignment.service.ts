import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
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
      .pipe(first());
  }

  findQuestionsByCourseAndAssignment(courseId: number, assignmentId: number) {
    return this.http
      .get<Question[]>(`${this.API_URL}/list/${courseId}/${assignmentId}`)
      .pipe(first());
  }

  private addQuestionAssignment(
    questionAssignment: Partial<QuestionAssignment>
  ) {
    return this.http
      .post(`${this.API_URL}`, {
        grade: questionAssignment.grade,
        question: questionAssignment.question,
        assignment: questionAssignment.assignment,
      })
      .pipe(first());
  }

  private updatedQuestionAssignment(
    questionAssignment: Partial<QuestionAssignment>
  ) {
    return this.http
      .put(`${this.API_URL}/${questionAssignment.idQuestionAssignment}`, {
        grade: questionAssignment.grade,
        question: questionAssignment.question,
        assignment: questionAssignment.assignment,
      })
      .pipe(first());
  }

  saveQuestionAssignment(questionAssignment: Partial<QuestionAssignment>) {
    if (
      questionAssignment.idQuestionAssignment != 0 &&
      questionAssignment.idQuestionAssignment != null
    ) {
      return this.updatedQuestionAssignment(questionAssignment);
    } else {
      return this.addQuestionAssignment(questionAssignment);
    }
  }

  delete(questionAssignmentId: number) {
    return this.http
      .delete(`${this.API_URL}/${questionAssignmentId}`)
      .pipe(first());
  }
}
