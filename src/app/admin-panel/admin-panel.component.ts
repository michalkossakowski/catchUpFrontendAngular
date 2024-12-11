import { Component } from '@angular/core';
import { AddUserComponent } from "./add-user/add-user.component";
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { UserDto } from '../Dtos/user.dto';
import { UserService } from '../services/user.service';
import {AddTaskComponent} from "../task/add-edit-task/add-task.component";
import {GiveTaskComponent} from "../task/give-task/give-task.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
    imports: [AddUserComponent, FormsModule, NgbDropdownModule, AddTaskComponent, GiveTaskComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent {
  selectedAction: string = "none"
    user: UserDto | undefined;
    isAdmin: boolean | undefined;

    constructor(private userService: UserService){
        this.userService.getLoggedInUser().subscribe((user) => this.user = user);

        if (this.user?.id) {
            this.userService.getRole(this.user.id).subscribe((role) => {
                this.isAdmin = role.toUpperCase() === "ADMIN";
            });
        }
    }
}
