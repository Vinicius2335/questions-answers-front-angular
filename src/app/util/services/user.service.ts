import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // NOTE: Caminho da URL.
  private professorURL = 'http://localhost:8080/api/professor';
  private studentURL = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) { }

  getProfessorBoard(){
    return this.http.get(this.professorURL, { responseType: 'text' });
  }

  getStudentBoard(){
    return this.http.get(this.studentURL, { responseType: 'text' });
  }
}
