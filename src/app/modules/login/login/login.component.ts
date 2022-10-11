import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { AuthLoginInfo } from 'src/app/security/models/auth-login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  testeSpinner!: any;
  modalRef?: BsModalRef;
  @ViewChild('template') template!: any;

  form = this.formBuilder.group({
    username: ['vinicius', [Validators.required]],
    password: ['devdojo', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private modalService: BsModalService
  ) {

    AuthService.authAsObservable().subscribe(
      (response) => {
        this.modalRef?.hide();
      }
    );

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-sm' }));
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.openModal(this.template);

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
