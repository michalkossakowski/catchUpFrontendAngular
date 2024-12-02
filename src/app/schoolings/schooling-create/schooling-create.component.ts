import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../Dtos/Category.dto';
import { SchoolingService } from '../../services/schooling.service';

@Component({
  selector: 'app-schooling-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schooling-create.component.html',
  styleUrls: ['./schooling-create.component.css'],
})
export class SchoolingCreateComponent{
  public schoolingCreateForm: FormGroup; 

  constructor(private fb: FormBuilder, private schoolingService: SchoolingService){
    this.schoolingCreateForm = this.fb.group({
      title: ['', [Validators.required]],          
      description: ['', [Validators.required]],      
      priority: [0],
    });
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
