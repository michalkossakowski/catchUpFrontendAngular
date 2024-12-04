import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from "@angular/common";

@Component({
    selector: 'give-task',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf],
    templateUrl: './give-task.component.html',
    styleUrls: ['./give-task.component.css']
})
export class GiveTaskComponent implements OnInit {
    taskForm: FormGroup;
    newbies: { id: string; name: string; surname: string }[] = [];
    tasks: { id: number; title: string; }[] = [];

    @ViewChild('toast', { static: false }) toast: ElementRef | undefined;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.taskForm = this.fb.group({
            newbieId: ['', [Validators.required]],
            taskContentId: ['', [Validators.required, Validators.min(1)]],
            status: ['', [Validators.required]],
            deadline: ['', [Validators.required, Validators.min(0)]],
            priority: ['', [Validators.required, Validators.min(0)]],
            state: ['', [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.loadNewbies();
        this.loadTasks();
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

    loadNewbies(): void {
        const endpoint = 'https://localhost:7097/api/NewbieMentor/GetAllNewbies';
        this.http.get<{ id: string; name: string; surname: string; }[]>(endpoint).subscribe({
            next: (newbies) => {
                this.newbies = newbies;
            },
            error: (err) => {
                console.error('Error loading newbies:', err);
            }
        });
    }

    loadTasks(): void {
        const endpoint = 'https://localhost:7097/api/TaskContent/GetAll';
        this.http.get<{ id: number; title: string; }[]>(endpoint).subscribe({
            next: (tasks) => {
                this.tasks = tasks;
            },
            error: (err) => {
                console.error('Error loading tasks:', err);
            }
        });
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
