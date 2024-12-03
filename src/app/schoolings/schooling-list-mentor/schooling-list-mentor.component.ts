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
  userSchoolingsId: number[] = []
  isUserChoosen: boolean = false
  userId: string | null = null

  @Input() set addSchoolings(schooling: FullSchoolingDto | undefined) {
    if (schooling) {
      this.addToFullSchoolings(schooling)
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
      },
      (error) => {
        this.error = 'Failed to load schoolings'
      }
    )
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

  private addToFullSchoolings(schooling: FullSchoolingDto): void {
    if (schooling) {
      this.fullschoolings = [...this.fullschoolings, schooling]
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
      next: () =>{
        this.fullschoolings = this.fullschoolings.filter(fs => fs.schooling.id !== schoolingId)
      }
    })
  }
  editSchooling(arg0: any) {
    throw new Error('Method not implemented.');
  }
}