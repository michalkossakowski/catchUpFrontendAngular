import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedbackDto } from '../../Dtos/feedback.dto';
import { FeedbackService } from '../../services/feedback.service';
import { UserService } from '../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-feedback.component.html',
  styleUrl: './add-edit-feedback.component.css'
})
export class AddEditFeedbackComponent {
  @Input() schoolingId: number | undefined = undefined;
  @Input() feedbackToEdit: FeedbackDto | undefined = undefined;
  @Output() feedbackCreated = new EventEmitter<FeedbackDto>();
  @Output() feedbackUpdated = new EventEmitter<FeedbackDto>();

  public feedbackAddForm: FormGroup;
  public mentors: { id: string, name: string, surname: string }[] = [];
  public isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) {
    this.feedbackAddForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      receiverId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadMentors();
    if (this.feedbackToEdit) {
      this.isEditMode = true;
      this.initializeEditForm();
    }
  }

  private initializeEditForm(): void {
    if (this.feedbackToEdit) {
      this.feedbackAddForm.patchValue({
        title: this.feedbackToEdit.title,
        description: this.feedbackToEdit.description,
        receiverId: this.feedbackToEdit.receiverId
      });
    }
  }

  loadMentors(): void {
    const endpoint = 'https://localhost:7097/api/User/GetMentorAdmin';
    this.http.get<{ id: string; name: string; surname: string }[]>(endpoint).subscribe({
      next: (mentors) => {
        this.mentors = mentors;
      },
      error: (err) => {
        console.error('Error loading mentors:', err);
      }
    });
  }

  submitFeedback(): void {
    if (!this.feedbackAddForm.valid) return;

    this.userService.getLoggedInUser().subscribe((user) => {
      const userId = user?.id;
      if (!userId) {
        console.warn('No logged user.');
        return;
      }

      const values = this.feedbackAddForm.value;
      const feedbackDto: FeedbackDto = {
        senderId: userId,
        receiverId: values.receiverId,
        title: values.title,
        description: values.description,
        resourceType: this.isEditMode && this.feedbackToEdit 
          ? this.feedbackToEdit.resourceType 
          : 10,
        resourceId: this.isEditMode && this.feedbackToEdit 
          ? this.feedbackToEdit.resourceId 
          : this.schoolingId
      };

      if (this.isEditMode && this.feedbackToEdit?.id) {
        this.feedbackService.edit(this.feedbackToEdit.id, feedbackDto).subscribe({
          next: (updatedFeedback) => {
            updatedFeedback.resourceId = feedbackDto.resourceId;
            updatedFeedback.resourceType = feedbackDto.resourceType;
            
            this.feedbackUpdated.emit(updatedFeedback);
            this.activeModal.close();
          },
          error: (error) => {
            console.error('Failed to update feedback', error);
          }
        });
      } else {
        this.feedbackService.add(feedbackDto).subscribe({
          next: (response) => {
            this.feedbackCreated.emit(response);
            this.activeModal.close();
          },
          error: (error) => {
            console.error('Failed to create feedback', error);
          }
        });
      }
    });
  }

  get title() {
    return this.feedbackAddForm.get('title');
  }

  get description() {
    return this.feedbackAddForm.get('description');
  }

  get receiverId() {
    return this.feedbackAddForm.get('receiverId');
  }
}
