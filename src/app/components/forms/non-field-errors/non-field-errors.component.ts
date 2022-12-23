import { Component, Input } from '@angular/core';
import { ValidationErrors } from '../../../core/constants';
import { BadRequest } from '../../../types';

@Component({
  selector: 'aw-non-field-errors',
  templateUrl: './non-field-errors.component.html',
})
export class NonFieldErrorsComponent {
  @Input() badRequest: BadRequest = {
    errors: [],
    status: 0,
    title: '',
    type: '',
  };

  validationErrors = ValidationErrors;

  get hasErrors(): boolean {
    return (
      this.badRequest &&
      this.badRequest.errors &&
      this.badRequest.errors.includes(ValidationErrors.nonFieldErrors)
    );
  }
}
