import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthLoginInfo } from './models/auth-login-info';
import { JwtDecoder } from './models/jwt-decoder';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly loginUrl = 'http://localhost:8080/login';
  decodedToken!: JwtDecoder;

  private static authSubject = new BehaviorSubject<boolean>(false);
  private static apiSubject = new BehaviorSubject<boolean>(
    (localStorage.getItem('api') || 'local') == 'local' ? false : true
  );

  public api = localStorage.getItem('api') || 'local';

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private jwtService: JwtHelperService
  ) { }

  login(credentials: AuthLoginInfo) {
    this.http.post(this.loginUrl, credentials, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        console.log(response);
        localStorage.setItem('token', response);
        this.decodedToken = this.jwtService.decodeToken(response);
        AuthService.authSubject.next(true);
        this.router.navigate(['/professor']);
      },
      error: (e) => {
        console.log(e);
        this.toastrService.error("Credenciais inválidas!");
        AuthService.authSubject.next(false);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    AuthService.authSubject.next(false);
    this.router.navigate(['/']);
  }

  getAuthorizationToken(): string {
    return this.basicAuth();
  }

  private basicAuth(): string {
    if (localStorage.getItem('token')) {
      const token = this.jwtService.tokenGetter();
      return `Bearer ${token}`;
    } else return '';
  }

  // TODO: NAO SEI PRA QUE SERVE
  static emitAuth(): void {
    let val = false;
    const api = localStorage.getItem('api') || 'local';
    if (api !== 'local') { // enabled
      val = localStorage.getItem('token') ? true : false;
    } else val = true;
    AuthService.authSubject.next(val);
  }

  // TODO: NAO SEI PRA QUE SERVE
  static authAsObservable(): Observable<boolean> {
    return AuthService.authSubject.asObservable();
  }

  // TODO: NAO SEI PRA QUE SERVE
  static emitApi(): void {
    const val = (localStorage.getItem('api') || 'local') == 'local' ? false : true;
    AuthService.apiSubject.next(val);
  }

  // TODO: NAO SEI PRA QUE SERVE
  static apiAsObservable(): Observable<boolean> {
    return AuthService.apiSubject.asObservable();
  }

}
