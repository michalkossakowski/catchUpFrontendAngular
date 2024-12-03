import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'give-task',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './give-task.component.html',
    styleUrls: ['./give-task.component.css']
})
export class GiveTaskComponent {
    taskForm: FormGroup;

    @ViewChild('toast', { static: false }) toast: ElementRef | undefined;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.taskForm = this.fb.group({
            newbieId: ['', [Validators.required]],  // Assuming 'newbieId' is the logged-in user
            taskContentId: ['', [Validators.required, Validators.min(1)]],
            status: ['', [Validators.required]],
            deadline: ['', [Validators.required, Validators.min(0)]],
            priority: ['', [Validators.required, Validators.min(0)]],
            state: ['', [Validators.required, Validators.min(0)]]
        });
    }

    giveTask(): void {
        if (this.taskForm.valid) {
            const endpoint = 'https://localhost:7097/api/Task/AddTaskToUser'; // New API endpoint
            this.http.post(endpoint, this.taskForm.value).subscribe({
                next: response => {
                    console.log('Task given successfully:', response);
                    this.showToast('Task given successfully!');
                },
                error: err => {
                    console.error('Error giving task:', err);
                    this.showToast('Error giving task.');
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
