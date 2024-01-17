import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/Auth/services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  isSubmitting = false;
  errorResp = '';
  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  subscriptionsDestroy$= new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subscriptionsDestroy$.next(true);
    this.subscriptionsDestroy$.unsubscribe();
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    this.errorResp = '';
    this.isSubmitting = true;
    this.auth
      .login(this.loginForm.getRawValue())
      .pipe(takeUntil(this.subscriptionsDestroy$))
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          if (res.ok) this.router.navigateByUrl('/dashboard');
        },
        error: (errorRes: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.errorResp =
            errorRes.status === 401
              ? 'Invalid Credentials'
              : errorRes.error?.message;
          // this.errorResp = errorRes.error?.message;
        },
      });
  }
}
