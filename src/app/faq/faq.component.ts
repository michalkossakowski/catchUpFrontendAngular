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
  faqList: FaqDto[] = [];
  showAddFaq: boolean = false;
  showEditFaq: boolean = false;
  selectedFaq!: FaqDto;
  emptyFaq: FaqDto = new FaqDto('','')
  loading: boolean = true;
  errorMessage!: string;
  showError: boolean = false;

  constructor(private faqService: FaqService){}
  
  toggleFaq(faq: FaqDto): void {
    this.selectedFaq = this.selectedFaq === faq ? this.emptyFaq : faq;
  }

  ngOnInit(): void {
    this.getFaqs();
  }
  
  async getFaqs() {
    this.loading = true;
    await this.faqService.getAll().subscribe(
      (faqList) => {
        this.faqList = faqList
        this.showError = false;
        this.loading = false
      },
      (error) => {
        this.showError = true
        this.errorMessage = error
        this.loading = false
      }
    );
  }

  async faqAddedInChild(newFaq: FaqDto) {
    await this.faqService.add(newFaq).subscribe(
      () => {
        this.showAddFaq = false;
        this.getFaqs();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async faqEditedInChild(editedFaq: FaqDto){
    await this.faqService.add(editedFaq).subscribe(
      () => {
        this.showEditFaq = false;
        this.getFaqs();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  async deleteFaq(){
    await this.faqService.delete(this.selectedFaq).subscribe(
      () => {
        this.getFaqs(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
}