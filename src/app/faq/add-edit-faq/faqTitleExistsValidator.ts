import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FaqDto } from '../../Dtos/faq.dto';

export function FaqTitleExistsValidator(existingFaqs: FaqDto[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log("validator inside: "+ existingFaqs)
    if(existingFaqs==null){
      return null;
    }
    const isTitleExists = existingFaqs.some(faq => faq.title === control.value.trim());
    console.log(`Title: ${control.value}` );
    if(isTitleExists){
      console.log(`Title exists: ${control.value}` );
    }
    return isTitleExists 
      ? { 'titleExists': true } 
      : null;
  };
}