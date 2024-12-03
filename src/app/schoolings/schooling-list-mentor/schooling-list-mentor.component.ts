import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SchoolingService } from '../../services/schooling.service';
import { FullSchoolingDto } from '../../Dtos/fullSchooling.dto';
import { FileService } from '../../services/file.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFilterPipe, FilterSchoolingPipe, PriorityFilterPipe } from '../schoolingFilter.pipe';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../Dtos/category.dto';

@Component({
  selector: 'app-schooling-list-mentor',
  standalone: true,
  imports: [
    FilterSchoolingPipe,
    ReactiveFormsModule,
    FormsModule,
    PriorityFilterPipe,
    CategoryFilterPipe,
    CommonModule
  ],
  templateUrl: './schooling-list-mentor.component.html',
  styleUrl: './schooling-list-mentor.component.css'
})
export class SchoolingListMentorComponent implements OnInit {
  fullschoolings: FullSchoolingDto[] = []
  error: string | null = null
  filterControl: FormControl = new FormControl()
  filterValue!: string
  selectedCategory!: string;
  minPriority!: number;
  categories: CategoryDto[] = [];

  @Input() set addSchoolings(schooling: FullSchoolingDto | undefined){
    if (schooling) {
      this.addToFullSchoolings(schooling)
    }
  }

  
  constructor(
    private schoolingService: SchoolingService,
    private fileService: FileService,
    private categoryService: CategoryService,
  ) {
    this.loadCategories()
    this.filterControl.valueChanges.subscribe({
      next: val => { this.filterValue = val; },
      error: error => console.error(error)
    });
  }

  ngOnInit(): void {
    this.loadSchoolings();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  loadSchoolings(): void {
    this.schoolingService.getAllSchoolings().subscribe(
      (response) => {
        this.fullschoolings = response.data;
      },
      (error) => {
        this.error = 'Failed to load schoolings'
      }
    )
  }
  downloadFile(fileId: number): void {
    this.fileService.downloadFile(fileId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `file`;
      a.click()
      window.URL.revokeObjectURL(url)
    })
  }
  addToFullSchoolings(schooling: FullSchoolingDto): void {
    if (schooling) {
      this.fullschoolings = [...this.fullschoolings, schooling]
    }
  }
}

