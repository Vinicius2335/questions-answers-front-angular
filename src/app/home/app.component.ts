import { AuthService } from 'src/app/security/auth.service';
import { JwtDecoder } from './../security/models/jwt-decoder';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;

  constructor(
    private jwtService: JwtHelperService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    AuthService.authAsObservable().subscribe(
      (response) => {
        this.isLogged = response;
      }
    );
  }

  onLogout(){
    this.authService.logout();
  }

  // isProfessor(){
  //   if (this.jwtService.tokenGetter() != null){
  //     const token: string = this.jwtService.tokenGetter();
  //     const jwtDecoder: JwtDecoder = this.jwtService.decodeToken(token);

  //     if (jwtDecoder.roles.includes('ROLE_PROFESSOR')){
  //     return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
  // }
}
