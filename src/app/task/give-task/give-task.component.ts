import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from "@angular/common";
import { TaskService } from "../../services/task.service";

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

    constructor(private fb: FormBuilder, private taskService: TaskService) {
        this.taskForm = this.fb.group({
            newbieId: ['', [Validators.required]],
            taskContentId: ['', [Validators.required, Validators.min(1)]],
            status: ['', [Validators.required]],
            deadline: ['', [Validators.required, Validators.min(0)]],
            priority: ['', [Validators.required, Validators.min(0)]],
            state: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.loadNewbies();
        this.loadTasks();
    }

    giveTask(): void {
        if (this.taskForm.valid) {
            this.taskService.assignTaskToUser(this.taskForm.value).subscribe({
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
        this.taskService.getAllNewbies().subscribe({
            next: (newbies) => {
                this.newbies = newbies;
            },
            error: (err) => {
                console.error('Error loading newbies:', err);
            }
        });
    }

    loadTasks(): void {
        this.taskService.getAllTaskContents().subscribe({
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