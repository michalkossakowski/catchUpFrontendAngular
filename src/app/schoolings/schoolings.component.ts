import { Component, OnInit } from '@angular/core';
import { SchoolingsListComponent } from "./schooling-list/schooling-list.component";
import { SchoolingCreateComponent } from "./schooling-create/schooling-create.component";
import { UserService } from '../services/user.service';
import { SchoolingListMentorComponent } from "./schooling-list-mentor/schooling-list-mentor.component";
import { FullSchoolingDto } from '../Dtos/fullSchooling.dto';
// import { MaterialItemComponent } from "../material/material-item/material-item.component";
// import { AddFileComponent } from "../file/add-file/add-file.component";
@Component({
  selector: 'app-schoolings',
  standalone: true,
  imports: [
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

  constructor(private userService: UserService){
    userService.getRole( this.userService.getLoggedInUser().id).subscribe((role) => {
      this.userRole = role
    })
  }
  onSchoolingCreated(schooling: FullSchoolingDto): void {
    this.schoolingData = schooling;
  }

}

