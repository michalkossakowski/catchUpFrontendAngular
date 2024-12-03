import { Component, NgModule, OnInit } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';
import { FaqService } from '../services/faq.service';
import { AddFaqComponent } from './add-edit-faq/add-edit-faq.component';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FilterFaqPipe } from './faqFilter.pipe';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialItemComponent } from "../material/material-item/material-item.component";
import { UserService } from '../services/user.service';
import { UserDto } from '../Dtos/user.dto';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FormsModule, AddFaqComponent, ReactiveFormsModule, FilterFaqPipe, NgbAccordionModule, MaterialItemComponent],
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
  filterValue!: string;
  filterControl: FormControl = new FormControl();
  faqTitles: string[] = [];
  user: UserDto | undefined;

  constructor(private faqService: FaqService,private router: Router, private userService: UserService)
  {
    this.filterControl.valueChanges.subscribe({
      next: val => { this.filterValue = val; },
      error: error => console.error(error)
    });

    this.user = userService.getLoggedInUser();
  }
  
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
        this.faqTitles = this.faqList.map(faq => faq.title ?? "");
      },
      (error) => {
        this.showError = true
        this.errorMessage = error
        this.loading = false
      }
    );
   
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
    },0);
  }
  
}