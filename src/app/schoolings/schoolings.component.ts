import { Component } from '@angular/core';
import { SchoolingsListComponent } from "./schooling-list/schooling-list.component";
import { SchoolingCreateComponent } from "./schooling-create/schooling-create.component";
import { UserService } from '../services/user.service';
import { SchoolingListMentorComponent } from "./schooling-list-mentor/schooling-list-mentor.component";
import { FullSchoolingDto } from '../Dtos/fullSchooling.dto';
import { MentorNewbieComponent } from '../mentor-newbie/mentor-newbie.component';

@Component({
  selector: 'app-schoolings',
  standalone: true,
  imports: [
    MentorNewbieComponent,
    SchoolingsListComponent,
    SchoolingCreateComponent,
    SchoolingListMentorComponent
  ],
  templateUrl: './schoolings.component.html',
  styleUrl: './schoolings.component.css'
})
export class SchoolingsComponent {
  public userRole?: string;
  schoolingData?: FullSchoolingDto;
  choosenUser?: string;

  constructor(private userService: UserService) {
    let userId: string | undefined
    this.userService.getLoggedInUser().subscribe((user) => {
      userId = user?.id
    })
    if (userId)
      userService.getRole(userId).subscribe((role) => {
        this.userRole = role
      })
  }

  public onSchoolingCreated(schooling: FullSchoolingDto): void {
    this.schoolingData = schooling;
  }
  public onEditSchoolings(userId: string | null): void {
    if (userId)
      this.choosenUser = userId
    else
      this.choosenUser = undefined
  }

}

