import { ValidationErrors, FormGroup } from '@angular/forms';

export function equalPasswordsValidator(formGroup: FormGroup): ValidationErrors | null {

    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
        return { 'equalPasswords': true };
    }

    return null;
}