import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { UserDto } from "../../Dtos/user.dto";
import { CommonModule } from '@angular/common';
import { MaterialItemComponent } from "../../material/material-item/material-item.component";

@Component({
    selector: 'add-task',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MaterialItemComponent],
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    taskForm: FormGroup;
    user: UserDto | undefined;
    categories: { id: number; name: string }[] = [];
    materialId: number | null = null;

    @ViewChild('toast', { static: false }) toast: ElementRef | undefined;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private userService: UserService
    ) {
        this.taskForm = this.fb.group({
            creatorId: ['', [Validators.required]],
            categoryId: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            materialsId: [null]
        });
    }

    ngOnInit(): void {
        this.userService.getLoggedInUser().subscribe((user) => {
            this.user = user;
            this.taskForm.patchValue({ creatorId: this.user?.id });
        });

        this.loadCategories();
    }

    onMaterialCreated(materialId: number): void {
        this.materialId = materialId;
        this.taskForm.patchValue({ materialsId: materialId });
    }

    removeMaterials(): void {
        if (confirm("Are you sure you want to remove the additional material?")) {
            this.materialId = null;
            this.taskForm.patchValue({ materialsId: null });
        }
    }

    loadCategories(): void {
        this.taskService.getAllCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: (err) => {
                console.error('Error loading categories:', err);
            }
        });
    }

    saveTask(): void {
        if (this.taskForm.valid) {
            const taskData = {...this.taskForm.value};

            this.taskService.addTaskContent(taskData).subscribe({
                next: (response) => {
                    console.log('Task added successfully:', response);
                    this.showToast('Task added successfully!');
                },
                error: (err) => {
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