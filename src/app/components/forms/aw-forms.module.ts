import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from './field-error/field-error.component';
import { NonFieldErrorsComponent } from './non-field-errors/non-field-errors.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [FieldErrorComponent, NonFieldErrorsComponent],
  exports: [FieldErrorComponent, NonFieldErrorsComponent],
})
export class AwFormsModule {}
