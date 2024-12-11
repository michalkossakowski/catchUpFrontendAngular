import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../Dtos/category.dto';
import { SchoolingService } from '../../services/schooling.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service'
import { SchoolingDto } from '../../Dtos/schooling.dto';
import { FullSchoolingDto } from '../../Dtos/fullSchooling.dto';

@Component({
  selector: 'app-schooling-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schooling-create.component.html',
  styleUrls: ['./schooling-create.component.css'],
})
export class SchoolingCreateComponent {
  public schoolingCreateForm: FormGroup;
  public categories: CategoryDto[] = [];
  @Output() schoolingCreated = new EventEmitter<FullSchoolingDto>();

  constructor(
    private fb: FormBuilder,
    private schoolingService: SchoolingService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {
    this.loadCategories();
    this.schoolingCreateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: [null, [Validators.required]],
      priority: [0, [Validators.required]],
    });
  }

  get title() {
    return this.schoolingCreateForm.get('title');
  }
  get description() {
    return this.schoolingCreateForm.get('description');
  }
  get categoryId() {
    return this.schoolingCreateForm.get('categoryId');
  }
  get priority() {
    return this.schoolingCreateForm.get('priority');
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }
  
  public submitForm(): void {
    let userId: string | undefined
    this.userService.getLoggedInUser().subscribe((user) => {
      userId = user?.id
    })
    if (userId) {
      const values = this.schoolingCreateForm.value
      const schoolingDto: SchoolingDto = {
        categoryId: values.categoryId,
        creatorId: userId,
        title: values.title,
        description: values.description,
        priority: values.priority
        
      }

      if (this.schoolingCreateForm.valid) {
        this.schoolingService.createSchooling(schoolingDto).subscribe((response) => {
          this.schoolingCreated.emit(response.data);
          this.schoolingCreateForm.reset({
            title: '',
            description: '',
            categoryId: null,
            priority: 0,
          });
        });
      }
    } else {
      console.warn('No logged user.');
    }
  }
}
