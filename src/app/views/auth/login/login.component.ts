import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BadRequest, FormInputTypes } from '../../../models/types/_index';
import { JwtTokenService } from './../../../services/jwt-token.service';
import { AuthRestService } from './../../../services/rest/auth-rest.service';
import { LoginResponse } from './login-response';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  badRequest: BadRequest;
  submitted = false;
  invalidLogin = false;
  formTypes = FormInputTypes;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService,
    private jwtTokenService: JwtTokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({});
    this.buildForm();
  }

  public handleSubmit(): void {
    this.submitted = true;
    this.invalidLogin = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authRestService
      .post(this.form.value, 'login')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: LoginResponse) => {
          this.jwtTokenService.setToken(result.token);

          if (this.jwtTokenService.getToken()) {
            const returnUrl = this.route.snapshot.params['returnUrl'] as string | '/';
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Forbidden) {
            this.invalidLogin = true;
          }
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
}
