import { Component, OnInit } from '@angular/core';
import { EditTaskComponent } from './add-edit-task/edit-task.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { TaskContentService } from '../services/task-content.service';
import { TaskDto } from '../Dtos/task.dto';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, EditTaskComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  assignedTasks: any[] = [];
  userRole!: string;
  userId!: string;
  error: string | null = null;
  showEditTask = false;
  createdTaskContents: any[] = [];
  selectedTask: any | null = null;

  constructor(
    private taskService: TaskService,
    private taskContentService: TaskContentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeUserData();
  }

  closeEdit(): void {
    this.showEditTask = false;
  }

  editTask(task: any): void {
    this.selectedTask = task;
    this.showEditTask = true;
  }

  private initializeUserData(): void {
    this.userService.getLoggedInUser().subscribe({
      next: (user) => {
        if (user && user.id) {
          this.userId = user.id;

          this.userService.getRole(this.userId).subscribe({
            next: (role) => {
              this.userRole = role;
              this.loadTasks();
            },
            error: () => {
              this.error = 'Failed to load user role';
            },
          });
        } else {
          this.error = 'Failed to load user information';
        }
      },
      error: () => {
        this.error = 'Failed to load user information';
      },
    });
  }

  loadTasks(): void {
    if (this.userRole === 'Newbie') {
      this.taskService.getAllFullTasksByNewbieId(this.userId).subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.loadCreatedTaskContent();
        },
        error: (err) => console.error('Error loading newbie tasks:', err),
      });
    } else if (this.userRole === 'Mentor' || this.userRole === 'Admin') {
      this.taskService.getAllTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.loadCreatedTaskContent();
        },
        error: (err) => console.error('Error loading tasks:', err),
      });

      this.taskService.getAssignedTasks(this.userId).subscribe({
        next: (assigned) => (this.assignedTasks = assigned),
        error: (err) => console.error('Error loading assigned tasks:', err),
      });
    }
  }

  loadCreatedTaskContent(): void {
    this.taskContentService.getByCreatorId(this.userId).subscribe({
      next: (content) => {
        this.createdTaskContents = content;
      },
      error: (err) => {
        console.error('Error loading created task content:', err);
      },
    });
  }
}
