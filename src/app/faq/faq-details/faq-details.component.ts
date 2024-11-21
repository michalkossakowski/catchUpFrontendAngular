import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqService } from '../../services/faq.service';
import { FaqDto } from '../../Dtos/faq.dto';
import { MaterialItemComponent } from "../../material/material-item/material-item.component";
import { AddFaqComponent } from "../add-edit-faq/add-edit-faq.component";

@Component({
  selector: 'app-faq-details',
  standalone: true,
  imports: [MaterialItemComponent, AddFaqComponent],
  templateUrl: './faq-details.component.html',
  styleUrl: './faq-details.component.css'
})
export class FaqDetailsComponent implements OnInit {
  faq!: FaqDto;
  errorMessage: string = '';
  showError: boolean = false;
  showEditFaq: boolean = false;
  faqId!: string;
  constructor(private faqService: FaqService, private route: ActivatedRoute, private router: Router) {}

  async ngOnInit(){
    this.faqId = this.route.snapshot.paramMap.get('id') ?? "";
    if (this.faqId) {
      this.getFaqDetails(this.faqId);  
    }
  }

  getFaqDetails(id: string){
    this.faqService.getById(id).subscribe(
      (faq) => {
        this.faq = faq;
        this.showError = false;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
    );
  }

  faqEditedInChild(editedFaq: FaqDto){
    if (confirm("Do you want to save changes?")) {
      this.faqService.edit(editedFaq).subscribe(
        () => {
          this.showEditFaq = false;
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  deleteFaq(){
    if (confirm("Are you sure?")) {
      this.faqService.delete(this.faq).subscribe(
        () => {
          this.backToFaq();
        },
        (error) => {
          console.error(error);
        }
      );
    }
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

  backToFaq(){
    this.router.navigate(['faq']);
  }
}
