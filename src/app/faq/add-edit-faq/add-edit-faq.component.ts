import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { FaqDto } from '../../Dtos/faq.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialItemComponent } from "../../material/material-item/material-item.component";
import { MaterialService } from '../../services/material.service';
import { FaqTitleExistsValidator } from './faqTitleExistsValidator';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-add-edit-faq',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialItemComponent],
  templateUrl: './add-edit-faq.component.html',
  styleUrl: './add-edit-faq.component.css'
})
export class AddFaqComponent {
  @Output() faqAdded: EventEmitter<FaqDto> = new EventEmitter();
  @Input() editedFaq?: FaqDto;
  @Output() faqEdited: EventEmitter<FaqDto> = new EventEmitter(); 

  public faqForm: FormGroup; 
  faqTitles: string[] = [];
  
  constructor(private fb: FormBuilder, private materialService: MaterialService,private faqService: FaqService){
    this.faqForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],          
      answer: ['', [Validators.required, Validators.minLength(3)]],      
      materialsId: [''],
    });

  }

  ngOnInit(): void {
    if (this.editedFaq) {
      this.faqForm.patchValue({
        title: this.editedFaq.title,
        answer: this.editedFaq.answer,
        materialsId: this.editedFaq.materialsId
      });
    }
    else{
      this.faqService.getAll().subscribe(
        (faqList) => {
          let allFaqTitles = faqList.map(faq => faq.title ?? "");
          this.faqTitles = allFaqTitles.filter(t => t !== this.editedFaq?.title) 
          this.faqForm.get('title')?.setValidators([Validators.required, Validators.minLength(3), FaqTitleExistsValidator(this.faqTitles)]);
          this.faqForm.get('title')?.updateValueAndValidity(); 
        }
      );
    }
  }

  get title() { 
    return this.faqForm.get('title');
  }
  get answer() { 
    return this.faqForm.get('answer');
  }
  get materialsId() { 
    return this.faqForm.get('materialsId');
  }

  onMaterialCreated(mid: number) {
    this.faqForm.value.materialsId = mid;
  }

  saveFaq(): void {
    const formValue = this.faqForm.value;
    if (this.editedFaq) {
      this.editedFaq.title = formValue.title;
      this.editedFaq.answer = formValue.answer;
      this.editedFaq.materialsId = formValue.materialsId ? formValue.materialsId : null;
      this.faqEdited.emit(this.editedFaq);
    } else {
      const newFaq = new FaqDto(
        undefined,
        formValue.title,
        formValue.answer,
        formValue.materialsId ? formValue.materialsId : null
      );
      this.faqAdded.emit(newFaq);
    }
  }

  removeMaterials(){
    if (confirm("Are you sure you want to delete additional materials?")) {
      this.materialService.deleteMaterial(this.faqForm.value.materialsId ?? -1).subscribe();
      this.faqForm.value.materialsId = null;
    }
  }
}