import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SchoolingService } from '../../services/schooling.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryDto } from '../../Dtos/category.dto';
import { CommonModule } from '@angular/common';
import { SchoolingDto } from '../../Dtos/schooling.dto';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FullSchoolingDto } from '../../Dtos/fullSchooling.dto';
import { SchoolingPartDto } from '../../Dtos/schoolingPart.dto';

@Component({
  selector: 'app-edit-schooling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-schooling.component.html',
  styleUrl: './edit-schooling.component.css'
})
export class EditSchoolingComponent {
  public categories: CategoryDto[] = [];
  public schoolingEditForm: FormGroup;
  private fullSchooling: FullSchoolingDto | undefined;
  @ViewChild('content') content: any;
  @Output() schoolingChanged: EventEmitter<FullSchoolingDto> = new EventEmitter<FullSchoolingDto>();

  constructor(
    public config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private schoolingService: SchoolingService,
    private categoryService: CategoryService,
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
    this.loadCategories();
    this.schoolingEditForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: [null, [Validators.required]],
      priority: [0, [Validators.required]],
    });
  }

  private changeForms(fullSchoolingDto: FullSchoolingDto): void {
    if (fullSchoolingDto) {
      const schooling = fullSchoolingDto.schooling
      this.fullSchooling = fullSchoolingDto
      this.schoolingEditForm.patchValue({
        title: schooling.title,
        description: schooling.description,
        categoryId: schooling.categoryId,
        priority: schooling.priority,
      });
    }
  }

  public openModal(fullSchoolingDto: FullSchoolingDto): void {
    this.changeForms(fullSchoolingDto)
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public submitForm(): void {
    if(this.fullSchooling && this.fullSchooling.schooling.id){
      const values = this.schoolingEditForm.value
      const editedSchooling = new SchoolingDto(
        values.categoryId,
        this.fullSchooling.schooling.creatorId, 
        values.title, 
        values.description, 
        values.priority
      )
      editedSchooling.id = this.fullSchooling.schooling.id
      this.schoolingService.editSchooling(editedSchooling).subscribe((response) => {
        var category =this.categories.find(cat => cat.id == this.fullSchooling?.schooling.categoryId)
        if(category && this.fullSchooling?.schooling && this.fullSchooling?.parts )
          this.schoolingChanged.emit(new FullSchoolingDto(editedSchooling,category,this.fullSchooling?.parts));
      });
    }
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  get title() {
    return this.schoolingEditForm.get('title');
  }
  get description() {
    return this.schoolingEditForm.get('description');
  }
  get categoryId() {
    return this.schoolingEditForm.get('categoryId');
  }
  get priority() {
    return this.schoolingEditForm.get('priority');
  }
}

