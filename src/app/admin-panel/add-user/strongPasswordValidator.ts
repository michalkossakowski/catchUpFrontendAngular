import { ValidationErrors, FormControl } from '@angular/forms';

export function strongPasswordValidator(formControl: FormControl): ValidationErrors | null {

    const password = formControl.value;

    if (/[^A-Za-z0-9]/.test(password) &&  /\d/.test(password)  && /[a-z]/.test(password) && /[A-Z]/.test(password)){
        return null;
      
    }
    else{
        return { 'strongPassword': true };
       
    }

    
}