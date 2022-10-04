import { JwtResponse } from './models/jwt-response';
import { AuthLoginInfo } from './models/auth-login-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Yype': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/login';
  private signUpUrl = '';

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: AuthLoginInfo){
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  // aki seria o mesmo para o registrar/signUp
}
