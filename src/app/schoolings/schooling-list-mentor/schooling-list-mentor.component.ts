import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SchoolingService } from '../../services/schooling.service';
import { FullSchoolingDto } from '../../Dtos/fullSchooling.dto';
import { FileService } from '../../services/file.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFilterPipe, FilterSchoolingPipe, PriorityFilterPipe } from '../schoolingFilter.pipe';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../Dtos/category.dto';
import { EditSchoolingComponent } from '../edit-schooling/edit-schooling.component';

@Component({
  selector: 'app-schooling-list-mentor',
  standalone: true,
  imports: [
    FilterSchoolingPipe,
    ReactiveFormsModule,
    FormsModule,
    PriorityFilterPipe,
    CategoryFilterPipe,
    CommonModule,
    EditSchoolingComponent
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
  userSchoolingsId: number[] = []
  isUserChoosen: boolean = false
  userId: string | null = null
  sortBy: string = 'title'; 
  sortDirection: string = 'asc'; 

  @ViewChild('editSchooling') editSchooling!: EditSchoolingComponent;

  @Input() set addSchoolings(schooling: FullSchoolingDto | undefined) {
    if (schooling) {
      this.addToFullSchoolings(schooling)
    }
  }

  @Input() set changeSchooling(schooling: FullSchoolingDto | undefined) {
    if (schooling) {
      this.changeInFullSchoolings(schooling)
    }
  }

  @Input() set getUserSchoolings(userId: string | undefined) {
    if (userId) {
      this.userId = userId
      this.schoolingService.getUserSchoolingsID(userId).subscribe((response) =>
        this.userSchoolingsId = response.data
      )
      this.isUserChoosen = true
    }
    else {
      this.userId = null
      this.isUserChoosen = false
      this.userSchoolingsId = []
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

  private loadSchoolings(): void {
    this.schoolingService.getAllSchoolings().subscribe(
      (response) => {
        this.fullschoolings = response.data;
        this.sortSchoolings();
      },
      (error) => {
        this.error = 'Failed to load schoolings';
      }
    );
  }

  public downloadFile(fileId: number): void {
    this.fileService.downloadFile(fileId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `file`;
      a.click()
      window.URL.revokeObjectURL(url)
    })
  }
  public changeInFullSchoolings(schooling: FullSchoolingDto): void {
    if (schooling) {
      const index = this.fullschoolings.findIndex(existingSchooling => existingSchooling.schooling.id === schooling.schooling.id);
      this.fullschoolings[index] = schooling;
      this.sortSchoolings();
    }
  }
  private addToFullSchoolings(schooling: FullSchoolingDto): void {
    if (schooling) {
      this.fullschoolings = [...this.fullschoolings, schooling];
      this.sortSchoolings();
    }
  }

  public isSchoolingChosen(schoolingId: number): boolean {
    return this.userSchoolingsId.includes(schoolingId);
  }

  public unassignSchooling(schoolingId: number) {
    if (this.userId) {
      this.schoolingService.archiveUserSchooling(this.userId, schoolingId).subscribe({
        next: () => {
          this.userSchoolingsId = this.userSchoolingsId.filter(id => id !== schoolingId);
        }
      })
    }
    else
      console.error("User not found")
  }

  public assignSchooling(schoolingId: number) {
    if (this.userId) {
      this.schoolingService.addSchoolingToUser(this.userId, schoolingId).subscribe({
        next: () => {
          this.userSchoolingsId.push(schoolingId)
        }
      })
    }
    else
      console.error("User not found")
  }

  public archiveSchooling(schoolingId: number) {
    this.schoolingService.archiveSchooling(schoolingId).subscribe({
      next: () => {
        this.fullschoolings = this.fullschoolings.filter(fs => fs.schooling.id !== schoolingId)
      }
    })
  }

  public openEditModal(schoolingId: number): void {
    var schooling = this.fullschoolings.find(schooling => schooling.schooling.id == schoolingId)
    if (schooling)
      this.editSchooling.openModal(schooling);
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