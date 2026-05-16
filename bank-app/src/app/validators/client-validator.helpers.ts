import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ClientValidators {
  static onlyNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toString() ?? '';
      return /^\d+$/.test(value) ? null : { onlyNumbers: true };
    };
  }

  static exactLength(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toString() ?? '';
      return value.length === length
        ? null
        : { exactLength: { expected: length, actual: value.length } };
    };
  }

  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value ?? '';
      return value.trim().length > 0 ? null : { whitespace: true };
    };
  }

  static minAge(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = Number(control.value);
      return value >= min ? null : { minAge: { expected: min, actual: value } };
    };
  }

  static maxAge(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = Number(control.value);
      return value <= max ? null : { maxAge: { expected: max, actual: value } };
    };
  }
}
