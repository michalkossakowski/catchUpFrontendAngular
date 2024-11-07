import { Component } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';
import { FaqService } from '../services/faq.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqList!: FaqDto[];

  constructor(private faqService: FaqService){
    this.faqService.getAll().subscribe(faqList => this.faqList = faqList)

  }

  addFaq() {
    const newFaq = new FaqDto('Stephen', 'Hawking');
    this.faqService.add(newFaq).subscribe(f => this.faqList.push(f));
  }
}