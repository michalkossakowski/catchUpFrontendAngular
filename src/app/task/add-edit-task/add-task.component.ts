import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { UserDto } from "../../Dtos/user.dto";
import { CommonModule } from '@angular/common';
import {MaterialItemComponent} from "../../material/material-item/material-item.component";

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

    @ViewChild('toast', { static: false }) toast: ElementRef | undefined;

    constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService) {
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
        this.taskForm.patchValue({ materialsId: materialId });
    }

    removeMaterials(): void {
        if (confirm("Are you sure you want to remove the additional material?")) {
            this.taskForm.patchValue({ materialsId: null }); // Reset materialsId in the form
        }
    }

    loadCategories(): void {
        const endpoint = 'https://localhost:7097/api/Category/GetAll';
        this.http.get<{ id: number; name: string }[]>(endpoint).subscribe({
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
            const endpoint = 'https://localhost:7097/api/TaskContent/Add';
            this.http.post(endpoint, this.taskForm.value).subscribe({
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