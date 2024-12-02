import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../Dtos/Category.dto';
import { SchoolingService } from '../../services/schooling.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-schooling-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schooling-create.component.html',
  styleUrls: ['./schooling-create.component.css'],
})
export class SchoolingCreateComponent{
  public schoolingCreateForm: FormGroup; 
  public categories: CategoryDto[] = []; 

  constructor(
    private fb: FormBuilder,
    private schoolingService: SchoolingService,
    private categoryService: CategoryService
  )
  {
    this.loadCategories();
    this.schoolingCreateForm = this.fb.group({
      title: ['', [Validators.required]],          
      description: ['', [Validators.required]],      
      categoryId: [null, [Validators.required]],
      priority: [0],
    });
  }

  private loadCategories(): void {
      this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
      console.log(response)
    });
  }
  public submitForm(): void {
    if (this.schoolingCreateForm.valid) {
      this.schoolingService.createSchooling(this.schoolingCreateForm.value).subscribe(() => {
        console.log('Schooling created successfully');
      });
    }
  }
  // categories: CategoryDto[] = [];
  // loading = false;
  // successMessage: string | null = null;
  // errorMessage: string | null = null;

  // private fb = inject(FormBuilder);
  // private schoolingService = inject(SchoolingService);

  // ngOnInit(): void {

  // }

}
