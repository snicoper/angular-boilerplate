import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRestService } from './../../../services/rest/auth-rest.service';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  invalidCredentials = false;

  constructor(private fb: FormBuilder, private authRestService: AuthRestService) {
    this.form = this.fb.group({});
    this.buildForm();
  }

  public handleSubmit(): void {
    this.invalidCredentials = false;

    if (this.form.invalid) {
      return;
    }

    this.authRestService.post(this.form.value, 'login').subscribe({
      next: (result) => {},
      error: (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Forbidden) {
          this.invalidCredentials = true;
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
