import { Component, EventEmitter, Output } from '@angular/core';
import { NewbieMentorService } from '../services/newbie-mentor.service';
import { UserDto } from '../Dtos/user.dto';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NewbieDetailsComponent } from "./newbie-details/newbie-details.component";

@Component({
  selector: 'app-mentor-newbie',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule, NewbieDetailsComponent],
  templateUrl: './mentor-newbie.component.html',
  styleUrl: './mentor-newbie.component.css'
})
export class MentorNewbieComponent {
  public newBies: UserDto[] = []
  public selectedUserDetails: UserDto | null = null
  public selectedUser: UserDto | null = null
  @Output() userChanged = new EventEmitter<string | null>()

  constructor(private newbieMentorService: NewbieMentorService) {
    this.gotNewbies();
  }

  private gotNewbies(): void {
    this.newbieMentorService.getAllNewbies().subscribe(response => {
      this.newBies = response;
    });
  }

  public openDetails(userId?: string): void {
    if (userId) {
      if (this.selectedUserDetails?.id === userId) {
        this.selectedUserDetails = null
      }
      else {
        const foundUser = this.newBies.find(user => user.id === userId);
        this.selectedUserDetails = foundUser || null;
      }
    }
  }

  public selectUser(userId?: string): void {
    if (userId) {
      if (this.selectedUser?.id === userId ) {
        this.selectedUser = null;
        this.userChanged.emit(null)
      } 
      else 
      {
        const foundUser = this.newBies.find(user => user.id === userId);
        this.selectedUser =  foundUser || null;
        this.userChanged.emit(userId)
      }
    }
  }
  public closeDetails(): void {
    this.selectedUserDetails = null
  }
}
