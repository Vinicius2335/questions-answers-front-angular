import { Question } from './../../../util/models/questions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly API_URL =
    'http://localhost:8080/api/professor/course/question';
  question!: Question;

  public questionSubject = new BehaviorSubject<Question>(this.question);

  constructor(private http: HttpClient) {}

  getListQuestions(idCourse: number) {
    return this.http
      .get<Question[]>(`${this.API_URL}/list/${idCourse}/?title=`)
      .pipe(first());
  }

  findById(id: number) {
    return this.http.get<Question>(`${this.API_URL}/${id}`).pipe(first());
  }

  private insertQuestion(question: Partial<Question>) {
    return this.http
      .post(this.API_URL, { title: question.title, course: question.course })
      .pipe(first());
  }

  private updatedCourse(question: Partial<Question>) {
    return this.http
      .put(`${this.API_URL}/${question.idQuestion}`, {
        title: question.title,
        course: question.course,
      })
      .pipe(first());
  }

  saveQuestion(question: Partial<Question>) {
    if (question.idQuestion != 0 && question.idQuestion != null) {
      return this.updatedCourse(question);
    } else {
      return this.insertQuestion(question);
    }
  }

  deleteQuestion(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  }

  questionObservable(): Observable<Question> {
    return this.questionSubject.asObservable();
  }
}
