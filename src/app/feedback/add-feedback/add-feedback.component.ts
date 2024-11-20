import { Component, EventEmitter, Output } from '@angular/core';
import { FeedbackDto } from '../../Dtos/feedback.dto';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {
  @Output() feedbackAdded = new EventEmitter<FeedbackDto>();
  @Output() cancel = new EventEmitter<void>();

  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      senderId: ['', Validators.required],
      reciverId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      origin: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.feedbackForm.valid) {
      const newFeedback = this.feedbackForm.value as FeedbackDto;
      this.feedbackAdded.emit(newFeedback);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
