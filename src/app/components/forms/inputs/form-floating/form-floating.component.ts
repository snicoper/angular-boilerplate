import { Component, forwardRef, Input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest, FormInputTypes } from '../../../../models/types/_index';

@Component({
  selector: 'aw-form-floating',
  templateUrl: './form-floating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFloatingComponent),
      multi: true
    }
  ]
})
export class FormFloatingComponent {
  @Input() id: string;
  @Input() form: FormGroup;
  @Input() fieldName: string;
  @Input() inputType = FormInputTypes.text;
  @Input() label: string;
  @Input() extraCss: string;
  @Input() badRequest: BadRequest;
  @Input() submitted = false;
  @Input() placeholder = '';

  value: string;
  isDisabled: boolean;

  constructor() {
    this.id = Math.random().toString();
  }

  onChange = (_: any): void => {};

  onTouch = (): void => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value || '';
      this.onChange(this.value);
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChangeValue(value: any): void {
    this.onChange(value);
  }

  isInvalid(): boolean {
    const control = this.form.get(this.fieldName) as FormGroup;

    return (
      (this.submitted && control.invalid) ||
      (this.badRequest && this.badRequest.errors && this.badRequest.errors.includes(this.fieldName))
    );
  }
}
