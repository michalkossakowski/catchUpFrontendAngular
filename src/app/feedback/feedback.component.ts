import { Component, NgModule, OnInit } from '@angular/core';
import { FeedbackDto } from '../Dtos/feedback.dto';
import { FeedbackService } from '../services/feedback.service';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [AddFeedbackComponent, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit{
  feedbackList: FeedbackDto[] = [];
  // recivedFeedback:;
  // sendedFeedback:;
  selectedRecivedFeedback!:FeedbackDto;
  selectedSendedFeedback!:FeedbackDto;
  emptyFeedback: FeedbackDto = new FeedbackDto('','','','','');
  loading: boolean = true;
  errorMessage!: string;
  showError: boolean = false;
  showAddFeedback: boolean = false;

  constructor(private feedbackService: FeedbackService,private router: Router){}

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getBySender('')
      .subscribe({
        next: (feedbackList) => {
          this.feedbackList = feedbackList;
          this.showError = false;
          this.loading = false;
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.message;
          this.loading = false;
        }
      });
  }

  toggleAddFeedback(): void {
    this.showAddFeedback = !this.showAddFeedback;
  }

  onFeedbackAdded(newFeedback: FeedbackDto): void {
    this.feedbackService.add(newFeedback).subscribe(() => {
      this.getAllFeedbacks();
      this.showAddFeedback = false;
    });
  }
}
