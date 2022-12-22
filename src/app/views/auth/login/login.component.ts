import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.buildForm();
  }

  public handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
}
