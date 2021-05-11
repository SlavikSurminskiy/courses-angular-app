import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noAuthorsValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const noAuthors = control.value.length < 1;

    return noAuthors ? { noAuthors: { value: control.value } } : null;
  };
}
