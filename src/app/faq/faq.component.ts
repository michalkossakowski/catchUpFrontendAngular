import { Component } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';
import { FaqService } from '../services/faq.service';
import { AddFaqComponent } from "./add-faq/add-faq.component";
import { EditFaqComponent } from "./edit-faq/edit-faq.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AddFaqComponent, EditFaqComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqList!: FaqDto[];
  showAddFaq: boolean = false;
  showEditFaq: boolean = false;
  selectedFaq!: FaqDto;
  emptyFaq: FaqDto = new FaqDto('','')

  constructor(private faqService: FaqService){
   this.getFaqs();
  }

  getFaqs(){
    this.faqService.getAll().subscribe(faqList => this.faqList = faqList)
  }

  toggleFaq(faq: FaqDto): void {
    this.selectedFaq = this.selectedFaq === faq ? this.emptyFaq : faq;
  }

  async faqAddedInChild(newFaq: FaqDto){
    await this.faqService.add(newFaq).subscribe(() => {
      this.showAddFaq = false;
      this.getFaqs();
    });
  }

  async faqEditedInChild(editedFaq: FaqDto){
    await this.faqService.edit(editedFaq).subscribe(() => {
      this.showEditFaq = false;
      this.getFaqs();
    });
  }
  
  async deleteFaq(){
    await this.faqService.delete(this.selectedFaq).subscribe(() => {
      this.getFaqs(); 
    });
  }
}