import { Component, ElementRef, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDto } from "../../Dtos/user.dto";
import { UserService } from "../../services/user.service";
import { TaskService } from "../../services/task.service";
import { MaterialItemComponent } from "../../material/material-item/material-item.component";
import { NgForOf, NgIf } from "@angular/common";

@Component({
    selector: 'app-edit-task',
    standalone: true,
    imports: [ReactiveFormsModule, MaterialItemComponent, NgForOf, NgIf],
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
    @Input() id: number = 17; // Default to 17 if no ID is passed, just for testing
    @Input() initialTask: any;
    @Output() taskEdited = new EventEmitter<void>();
    taskForm: FormGroup;
    user: UserDto | undefined;
    categories: { id: number; name: string }[] = [];

    @ViewChild('toast', { static: false }) toast: ElementRef | undefined;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private taskService: TaskService
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
      
          // If an initial task is passed, populate the form
          if (this.initialTask) {
            this.taskForm.patchValue({
              categoryId: this.initialTask.categoryId,
              title: this.initialTask.title,
              description: this.initialTask.description,
              materialsId: this.initialTask.materialsId
            });
          }
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
            this.taskService.editTaskContent(this.id, this.taskForm.value).subscribe({
                next: response => {
                    console.log('Task edited successfully:', response);
                    this.showToast('Task edited successfully!');
                    this.taskEdited.emit();
                },
                error: err => {
                    console.error('Error editing task:', err);
                    this.showToast('Error editing task');
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