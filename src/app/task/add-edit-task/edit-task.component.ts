import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {UserDto} from "../../Dtos/user.dto";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() id: number = 17; // Default to 17 if no ID is passed, just for testing
  taskForm: FormGroup;
  user: UserDto | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService) {
    this.userService.getLoggedInUser().subscribe((user) => this.user = user);
    this.taskForm = this.fb.group({
      creatorId: [this.user?.id, [Validators.required]],
      categoryId: ['', [Validators.required, Validators.min(1)]],
      materialsId: ['', [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.loadTaskData();
  }

  loadTaskData(): void {
    const endpoint = `https://localhost:7097/api/TaskContent/GetById/${this.id}`;
    this.http.get(endpoint).subscribe({
      next: (data: any) => {
        this.taskForm.patchValue(data); // Populate the form with task data
      },
      error: err => console.error('Error loading task data:', err)
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const endpoint = `https://localhost:7097/api/TaskContent/Edit/${this.id}`;

      this.http.put(endpoint, this.taskForm.value).subscribe({
        next: response => console.log('Task edited successfully:', response),
        error: err => console.error('Error editing task:', err)
      });
    }
  }
}
