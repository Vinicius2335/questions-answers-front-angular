import { Question } from './../../../util/models/questions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly API_URL = 'http://localhost:8080/api/professor/course/question';

  constructor(private http: HttpClient) { }

  getListQuestions(idCourse: number){
    return this.http.get<Question[]>(`${this.API_URL}/list/${idCourse}/?title=`).pipe(
      tap(console.log),
      first());
  }

  // findById(id: number){
  //   return this.http.get<Question>(`${this.API_URL}/${id}`).pipe(first());
  // }

  // private insertQuestion(question: Partial<Question>){
  //   return this.http.post(this.API_URL, {name: question.name}).pipe(first());
  // }

  // private updatedCourse(id: number, question: Partial<Question>){
  //   return this.http.put(`${this.API_URL}/${id}`, {name: course.name}).pipe(first());
  // }

  // saveQuestion(question: Partial<Question>){
  //   if (course.idCourse != 0 && course.idCourse != null){
  //     return this.updatedCourse(course.idCourse, course);
  //   } else {
  //     return this.insertCourse(course);
  //   }
  // }

  // deleteQuestion(id: number){
  //   return this.http.delete(`${this.API_URL}/${id}`).pipe(first());
  // }

}
