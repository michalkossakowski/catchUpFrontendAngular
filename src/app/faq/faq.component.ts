import { Component, OnInit } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';
import { FaqService } from '../services/faq.service';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FormsModule, AddFaqComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})

export class FaqComponent implements OnInit {
  faqList: FaqDto[] = [];
  selectedFaq!: FaqDto;
  emptyFaq: FaqDto = new FaqDto('','')
  loading: boolean = true;
  errorMessage!: string;
  showError: boolean = false;
  showAddFaq: boolean = false;
  public searchingTitle!:string;

  constructor(private faqService: FaqService,private router: Router){}
  
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

  openDetailsFaq(){
    this.router.navigate(['/faq/details', this.selectedFaq.id]);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    },50);
  }
  
}