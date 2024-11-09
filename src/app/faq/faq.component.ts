import { Component } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';
import { FaqService } from '../services/faq.service';
import { AddFaqComponent } from "./add-faq/add-faq.component";
import { EditFaqComponent } from "./edit-faq/edit-faq.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AddFaqComponent, EditFaqComponent,FormsModule],
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
  public searchingTitle!:string;

  constructor(private faqService: FaqService){}
  
  toggleFaq(faq: FaqDto): void {
    this.selectedFaq = this.selectedFaq === faq ? this.emptyFaq : faq;
  }

  ngOnInit(): void {
    this.getFaqs();
  }
  
  getFaqs() {
    this.loading = true;
    this.faqService.getAll().subscribe(
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

  getFaqsByTitle() {
    if(this.searchingTitle.trim().length == 0) {
      this.getFaqs()
    }
    else{
      this.loading = true;
      this.faqService.getByTitle(this.searchingTitle).subscribe(
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
  }

  faqAddedInChild(newFaq: FaqDto) {
    this.faqService.add(newFaq).subscribe(
      () => {
        this.showAddFaq = false;
        this.getFaqs();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  faqEditedInChild(editedFaq: FaqDto){
    this.faqService.edit(editedFaq).subscribe(
      () => {
        this.showEditFaq = false;
        this.getFaqs();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  deleteFaq(){
    this.faqService.delete(this.selectedFaq).subscribe(
      () => {
        this.getFaqs(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
}