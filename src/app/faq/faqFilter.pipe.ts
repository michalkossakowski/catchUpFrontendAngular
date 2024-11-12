import { Pipe, PipeTransform } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';

@Pipe({
  standalone: true,
  name: 'faqFilter'
})

export class FilterFaqPipe implements PipeTransform {

  transform(faqs: FaqDto[], ...args: string[]): any {
    const filterValue = args[0];
    if (!filterValue) {
      return faqs;
    }
    const filteredFaqs = faqs.filter(el => {
      return el.title?.toLowerCase().includes(filterValue.toLowerCase()) ;
    });
    return filteredFaqs;
  }

}