import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { UserService } from '../services/user.service';
import { FeedbackDto } from '../Dtos/feedback.dto';
import { FullSchoolingDto } from '../Dtos/fullSchooling.dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditFeedbackComponent } from './add-edit-feedback/add-edit-feedback.component';
import { DetailsFeedbackComponent } from './details-feedback/details-feedback.component';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackList: FeedbackDto[] = [];
  error: string = '';
  public userRole?: string;
  private userId?: string;

  constructor(
    private feedbackService: FeedbackService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  openDetailsModal(feedback: FeedbackDto): void {
    const modalRef = this.modalService.open(DetailsFeedbackComponent);
    modalRef.componentInstance.feedback = feedback;
  }

  openEditModal(feedback: FeedbackDto): void {
    const modalRef = this.modalService.open(AddEditFeedbackComponent);
    modalRef.componentInstance.feedbackToEdit = feedback;
    modalRef.componentInstance.feedbackUpdated.subscribe(() => {
      this.initializeUserData();
    });
  }

  deleteFeedback(feedbackId: number): void {
    this.feedbackService.delete(feedbackId).subscribe({
      next: () => {
        this.feedbackList = this.feedbackList.filter(f => f.id !== feedbackId);
      },
      error: () => console.error('Failed to delete feedback'),
    });
  }

  ngOnInit(): void {
    this.initializeUserData();
  }

  private initializeUserData(): void {
    this.userService.getLoggedInUser().subscribe({
      next: (user) => {
        if (user && user.id) {
          const userId = user.id;
  
          this.userService.getRole(userId).subscribe({
            next: (role) => {
              this.userRole = role;
              this.loadFeedbacks(userId);
            },
            error: () => {
              this.error = 'Failed to load user role';
            }
          });
        } else {
          this.error = 'Failed to load user information';
        }
      },
      error: () => {
        this.error = 'Failed to load user information';
      }
    });
  }

  private loadUserDetails(feedbacks: FeedbackDto[]): void {
    feedbacks.forEach(feedback => {
      if (feedback.senderId) {
        this.userService.getById(feedback.senderId).subscribe({
          next: (user) => {
            feedback.senderName = user.name;
            feedback.senderSurname = user.surname;
          },
          error: () => {
            console.error(`Failed to load sender details for ID: ${feedback.senderId}`);
          }
        });
      }
  
      if (feedback.receiverId) {
        this.userService.getById(feedback.receiverId).subscribe({
          next: (user) => {
            feedback.receiverName = user.name;
            feedback.receiverSurname = user.surname;
          },
          error: () => {
            console.error(`Failed to load receiver details for ID: ${feedback.receiverId}`);
          }
        });
      }
    });
  }

  private loadFeedbacks(userId: string): void {
    if (this.userRole === 'Newbie') {
      this.feedbackService.getBySender(userId).subscribe({
        next: (feedbacks) => {
          this.feedbackList = feedbacks;
          this.loadSchoolingTitles(feedbacks);
          this.loadUserDetails(feedbacks);
        },
        error: () => {
          this.error = 'Failed to load feedbacks sent by user';
        }
      });
    } else if (this.userRole === 'Mentor' || this.userRole === 'Admin') {
      this.feedbackService.getByReceiver(userId).subscribe({
        next: (feedbacks) => {
          this.feedbackList = feedbacks;
          this.loadSchoolingTitles(feedbacks);
          this.loadUserDetails(feedbacks);
        },
        error: () => {
          this.error = 'Failed to load feedbacks received by user';
        }
      });
    }
  }

  private loadSchoolingTitles(feedbacks: FeedbackDto[]): void {
    feedbacks.forEach(feedback => {
      if (!feedback.resourceId) {
        feedback.schoolingTitle = 'No Resource ID';
        return;
      }

      this.feedbackService.getSchoolingById(feedback.resourceId).subscribe({
        next: (fullSchooling: FullSchoolingDto) => {
          feedback.schoolingTitle = fullSchooling.schooling.title;
        },
        error: (error) => {
          console.error('Failed to load schooling title', error);
          feedback.schoolingTitle = 'Error Loading Schooling';
        }
      });
    });
  }
}
