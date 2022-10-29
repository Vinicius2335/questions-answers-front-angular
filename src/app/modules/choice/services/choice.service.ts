import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { Choice } from 'src/app/util/models/choice';

@Injectable({
  providedIn: 'root',
})
export class ChoiceService {
  private readonly API_URL =
    'http://localhost:8080/api/professor/course/question/choice';

  public choiceIdSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getListChoices(idQuestion: number) {
    return this.http
      .get<Choice[]>(`${this.API_URL}/list/${idQuestion}`)
      .pipe(first());
  }

  findById(id: number) {
    return this.http.get<Choice>(`${this.API_URL}/${id}`).pipe(first());
  }

  private insertChoice(choice: Partial<Choice>) {
    return this.http
      .post(this.API_URL, {
        title: choice.title,
        question: choice.question,
        correctAnswer: choice.correctAnswer,
      })
      .pipe(first());
  }

  private updatedChoice(choice: Partial<Choice>) {
    return this.http
      .put(`${this.API_URL}/${choice.idChoice}`, {
        title: choice.title,
        question: choice.question,
        correctAnswer: choice.correctAnswer,
      })
      .pipe(first());
  }

  saveChoice(choice: Partial<Choice>) {
    if (choice.idChoice != 0 && choice.idChoice != null) {
      return this.updatedChoice(choice);
    } else {
      return this.insertChoice(choice);
    }
  }

  deleteChoice(id: number){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  }

  choiceIdObservable(): Observable<number> {
    return this.choiceIdSubject.asObservable();
  }
}
