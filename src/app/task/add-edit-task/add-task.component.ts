import {Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import {UserDto} from "../../Dtos/user.dto";

@Component({
    selector: 'add-task',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent {
    taskForm: FormGroup;
    user: UserDto | undefined;

    @ViewChild('toast', { static: false }) toast: ElementRef | undefined;

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

    saveTask(): void {
        if (this.taskForm.valid) {
            const endpoint = 'https://localhost:7097/api/TaskContent/Add';
            this.http.post(endpoint, this.taskForm.value).subscribe({
                next: response => {
                    console.log('Task added successfully:', response);
                    this.showToast('Task added successfully!');
                },
                error: err => {
                    console.error('Error adding task:', err);
                    this.showToast('Error adding task.');
                }
            });
        }
    }

    showToast(message: string): void {
        const toastElement = this.toast?.nativeElement;
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.textContent = message;

        toastElement.classList.add('show');

        setTimeout(() => {
            toastElement.classList.remove('show');
        }, 3000);
    }
}
