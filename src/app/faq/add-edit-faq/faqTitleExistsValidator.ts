import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function FaqTitleExistsValidator(existingTitles: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const isTitleExists = existingTitles.some(title => title === control.value);

    return isTitleExists ? { 'titleExists': true } : null;
  };
}