import { Component } from '@angular/core';
import { AddUserComponent } from "./add-user/add-user.component";
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
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

}
