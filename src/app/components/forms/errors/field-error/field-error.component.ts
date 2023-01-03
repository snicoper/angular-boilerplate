import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { BadRequest } from '../../../../models/types/_index';

@Component({
  selector: 'aw-field-error',
  templateUrl: './field-error.component.html'
})
export class FieldErrorComponent implements OnInit {
  @Input() submitted = false;
  @Input() fieldText: string;
  @Input() fieldName: string;
  @Input() badRequest: BadRequest;
  @Input() form: FormGroup;
  @Input() validateOnlyOnSubmit = false;

  control: AbstractControl;

  ngOnInit(): void {
    this.control = this.form.get(this.fieldName) as FormGroup;
  }

  formHasErrors(): boolean | ValidationErrors | null | undefined {
    return (
      (this.submitted && this.form && this.form.dirty) ||
      (this.form.touched && this.form.get(this.fieldName) && this.form.get(this.fieldName)?.errors)
    );
  }

  controlHasErrors(): boolean {
    const validateRules = this.validateOnlyOnSubmit
      ? this.submitted && this.control && this.control.dirty && this.control?.errors
      : this.control && this.control.dirty && this.control?.errors;

    return !!(validateRules || (this.submitted && this.control?.errors));
  }

  getBadRequestErrors(): string {
    if (this.badRequest && this.badRequest.status === HttpStatusCode.BadRequest) {
      const index = this.badRequest.errors.indexOf(this.fieldName);

      return this.badRequest.errors[index] || '';
    }

    return '';
  }

  getControlErrorByErrorName(errorName: string): ValidationErrors | null {
    return this.control.errors && errorName in this.control.errors ? this.control.errors[errorName] : null;
  }
}
