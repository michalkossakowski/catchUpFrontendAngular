import { Component } from '@angular/core';
import {AddTaskComponent} from './add-edit-task/add-task.component';
import {CommonModule} from "@angular/common";
import {EditTaskComponent} from "./add-edit-task/edit-task.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, EditTaskComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  showEditTask = false;

  toggleEditTask() {
    this.showEditTask = !this.showEditTask;
  }
}
