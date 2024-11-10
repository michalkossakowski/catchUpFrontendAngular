import { ValidationErrors, FormControl } from '@angular/forms';

export function typeValidator(formControl: FormControl): ValidationErrors | null {
    const types = ["Admin","Newbie"]

    if (!types.includes(formControl.value)) {
        return { 'typeAllowed': true };
    }

  return null;
}