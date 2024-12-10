import { Component, OnInit } from '@angular/core';
import { EditTaskComponent } from './add-edit-task/edit-task.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { TaskContentService } from '../services/task-content.service';
import { TaskDto } from '../Dtos/task.dto';
import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';
import { MaterialItemComponent } from "../material/material-item/material-item.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, EditTaskComponent, MaterialItemComponent],
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
    private userService: UserService,
    private categoryService: CategoryService
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

  onTaskEdited(): void {
    this.showEditTask = false;
    this.selectedTask = null;
    this.closeEdit();
    this.initializeUserData();
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
          this.tasks = tasks.map(task => this.mapTaskWithCategoryName(task));
          this.loadCreatedTaskContent();
        },
        error: (err) => console.error('Error loading newbie tasks:', err),
      });
    } else if (this.userRole === 'Mentor' || this.userRole === 'Admin') {
      this.taskService.getAllTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks.map(task => this.mapTaskWithCategoryName(task));
          this.loadCreatedTaskContent();
        },
        error: (err) => console.error('Error loading tasks:', err),
      });

      this.taskService.getAssignedTasks(this.userId).subscribe({
        next: (assigned) => {
          this.assignedTasks = assigned.map(task => {
            if (task.newbieId) {
              this.userService.getById(task.newbieId).subscribe({
                next: (user) => {
                  task.newbieName = user.name;
                  task.newbieSurname = user.surname;
                },
                error: () => {
                  console.error(`Failed to load newbie details for ID: ${task.newbieId}`);
                }
              });
            }
            return task;
          });
        },
        error: (err) => console.error('Error loading assigned tasks:', err),
      });
    }
  }

  private mapTaskWithCategoryName(task: any): any {
    const mappedTask = { ...task };
    
    if (mappedTask.categoryId) {
      this.categoryService.getCategoryById(mappedTask.categoryId).subscribe({
        next: (category) => {
          mappedTask.categoryName = category.name;
        },
        error: (err) => {
          console.error(`Error fetching category for ID ${mappedTask.categoryId}:`, err);
          mappedTask.categoryName = 'Unknown Category';
        }
      });
    }
    
    return mappedTask;
  }

  loadCreatedTaskContent(): void {
    if (this.userRole === 'Mentor' || this.userRole === 'Admin') {
      this.taskContentService.getByCreatorId(this.userId).subscribe({
        next: (content) => {
          this.createdTaskContents = content.map(task => this.mapTaskWithCategoryName(task));
        },
        error: (err) => {
          console.error('Error loading created task content:', err);
        },
      });
    }
  }
}