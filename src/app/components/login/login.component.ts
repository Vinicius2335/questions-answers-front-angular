import { TokenStorageService } from './../../auth/token-storage.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginInfo } from 'src/app/auth/models/auth-login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage!: string;
  roles!: string[];
  private loginInfo!: AuthLoginInfo;

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }
  }

  onSubmit(){
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(this.form.controls.username.value, this.form.controls.password.value);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      (data: any) => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUsername(data.username);
        this.tokenStorageService.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getAuthorities();
        this.reloadPage();
      },
      (error: any) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
