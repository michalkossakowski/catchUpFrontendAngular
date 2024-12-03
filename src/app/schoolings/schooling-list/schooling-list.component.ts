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
    const userId = this.userService.getLoggedInUser().id
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
}

