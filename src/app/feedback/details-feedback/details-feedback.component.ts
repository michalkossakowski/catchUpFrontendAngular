import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackDto } from '../../Dtos/feedback.dto';

@Component({
  selector: 'app-details-feedback',
  standalone: true,
  templateUrl: './details-feedback.component.html',
  styleUrls: ['./details-feedback.component.css']
})
export class DetailsFeedbackComponent {
  @Input() feedback!: FeedbackDto;

  constructor(public activeModal: NgbActiveModal) {}
}
