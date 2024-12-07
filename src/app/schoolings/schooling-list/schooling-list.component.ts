import { Component, OnInit } from '@angular/core';
import { SchoolingService } from '../../services/schooling.service';
import { FullSchoolingDto } from '../../Dtos/fullSchooling.dto';
import { FileService } from '../../services/file.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFilterPipe, FilterSchoolingPipe, PriorityFilterPipe } from '../schoolingFilter.pipe';
import { CategoryDto } from '../../Dtos/category.dto';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-schooling-list',
  standalone: true,
  imports: [
    FilterSchoolingPipe,
    ReactiveFormsModule,
    FormsModule,
    PriorityFilterPipe,
    CategoryFilterPipe,
    CommonModule
  ],
  templateUrl: './schooling-list.component.html',
  styleUrl: './schooling-list.component.css'
})
export class SchoolingsListComponent implements OnInit {
  fullschoolings: FullSchoolingDto[] = []
  error: string | null = null
  filterControl: FormControl = new FormControl()
  filterValue!: string
  selectedCategory!: string;
  minPriority!: number;
  categories: CategoryDto[] = [];
  sortBy: string = 'title'; 
  sortDirection: string = 'asc'; 
  
  constructor(
    private schoolingService: SchoolingService,
    private fileService: FileService,
    private categoryService: CategoryService,
    private userService: UserService
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
    let userId: string | undefined
    this.userService.getLoggedInUser().subscribe((user) => {
      userId = user?.id
    })
    if (userId)
      this.schoolingService.getAllUserSchoolings(userId).subscribe(
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
  public sortSchoolings(): void {
    this.fullschoolings.sort((a, b) => {
      let comparison = 0;
  
      if (this.sortBy === 'title') {
        comparison = a.schooling.title.localeCompare(b.schooling.title);
      } else if (this.sortBy === 'priority') {
        comparison = a.schooling.priority - b.schooling.priority;
      } else if (this.sortBy === 'category') {
        const categoryA = a.category?.name || '';
        const categoryB = b.category?.name || '';
        comparison = categoryA.localeCompare(categoryB);
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
  
  public sortSchoolingsDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortSchoolings();
  }
}

