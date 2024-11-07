import { Component } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';
import { FaqService } from '../services/faq.service';
import { AddFaqComponent } from "../add-faq/add-faq.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AddFaqComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqList!: FaqDto[];

  constructor(private faqService: FaqService){
    this.faqService.getAll().subscribe(faqList => this.faqList = faqList)
  }

  addFaq() {
    const newFaq = new FaqDto('Stephen', 'Hawkin2');
    this.faqList.push(newFaq);
    this.faqService.add(newFaq).subscribe();
  }

  FaqAddedInChild(newFaq: FaqDto){
    this.faqList.push(newFaq);
    this.faqService.add(newFaq).subscribe();
  }
}