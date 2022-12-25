import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest } from '../../../../models/types/_index';

@Component({
  selector: 'aw-form-textarea',
  templateUrl: './form-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true
    }
  ]
})
export class FormTextareaComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() form: FormGroup;
  @Input() fieldName: string;
  @Input() label: string;
  @Input() extraCss: string;
  @Input() badRequest: BadRequest;
  @Input() submitted = false;
  @Input() placeholder = '';
  @Input() rows = 3;
  @Input() cols: number;

  value: string;
  isDisabled: boolean;

  constructor() {
    this.id = Math.random().toString();
  }

  onChange = (_: string): void => {};

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
    const control = this.form.get(this.fieldName);

    return (
      (this.submitted && control?.invalid) ||
      (this.badRequest && this.badRequest.errors && this.badRequest.errors.includes(this.fieldName))
    );
  }
}
