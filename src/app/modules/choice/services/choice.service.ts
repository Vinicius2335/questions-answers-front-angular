import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, tap } from 'rxjs';
import { Choice } from 'src/app/util/models/choice';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {
  private readonly API_URL =
    'http://localhost:8080/api/professor/course/question/choice';

  public choiceIdSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getListChoices(idQuestion: number) {
    return this.http
      .get<Choice[]>(`${this.API_URL}/list/${idQuestion}`)
      .pipe(tap(console.log), first());
  }

  // findById(id: number){
  //   return this.http.get<Question>(`${this.API_URL}/${id}`).pipe(first());
  // }

  // private insertQuestion(question: Partial<Question>) {
  //   return this.http
  //     .post(this.API_URL, { title: question.title, course: question.course })
  //     .pipe(first());
  // }

  // private updatedCourse(question: Partial<Question>) {
  //   return this.http
  //     .put(`${this.API_URL}/${question.idQuestion}`, {
  //       title: question.title,
  //       course: question.course,
  //     })
  //     .pipe(first());
  // }

  // saveQuestion(question: Partial<Question>) {
  //   if (question.idQuestion != 0 && question.idQuestion != null) {
  //     return this.updatedCourse(question);
  //   } else {
  //     return this.insertQuestion(question);
  //   }
  // }

  // deleteQuestion(id: number){
  //   return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  // }

  // questionIdObservable(): Observable<number> {
  //   return this.questionIdSubject.asObservable();
  // }
}
