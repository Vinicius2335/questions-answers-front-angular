import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { AuthLoginInfo } from 'src/app/security/models/auth-login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form = this.formBuilder.group({
    username: ['vinicius', [Validators.required]],
    password: ['devdojo', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {

  }

  ngOnInit(): void {
  }

  onLogin() {
    const credentials = new AuthLoginInfo(
      this.form.controls.username.value,
      this.form.controls.password.value,
    );

    this.auth.login(credentials);
  }

  onLogout() {
    this.auth.logout();
  }

}
