import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { AuthService } from '../../services/auth.service';

interface LoginForm {
  userId: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: LoginForm = {
    userId: '',
    password: '',
  };

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  onSubmitClick(ngForm: NgForm): void {
    const form = ngForm.form;
    const rawFormValue: LoginForm = form.getRawValue();

    this.authService
      .login({
        user_id: rawFormValue.userId,
        password: rawFormValue.password,
      })
      .pipe(
        catchError((err) => {
          err.error.message && alert(err.error.message);

          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
        }
      });
  }
}
