import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackDto } from '../../Dtos/feedback.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-feedback.component.html',
  styleUrls: ['./details-feedback.component.css']
})
export class DetailsFeedbackComponent {
  @Input() feedback!: FeedbackDto;

  constructor(public activeModal: NgbActiveModal) {}
}
