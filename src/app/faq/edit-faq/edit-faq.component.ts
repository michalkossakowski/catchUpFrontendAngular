import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaqDto } from '../../Dtos/faq.dto';
import { FormsModule } from '@angular/forms';
import { MaterialItemComponent } from "../../material/material-item/material-item.component";

@Component({
  selector: 'app-edit-faq',
  standalone: true,
  imports: [FormsModule, MaterialItemComponent],
  templateUrl: './edit-faq.component.html',
  styleUrl: './edit-faq.component.css'
})
export class EditFaqComponent {
  public editedTitle!:string | undefined ;
  public editedAnswear!:string | undefined ;
  public editedMaterialsId!:number | undefined | null;
  @Output() faqEdited: EventEmitter<FaqDto> = new EventEmitter();
  
  onMaterialCreated(mid: number) {
    this.editedMaterialsId = mid;
  }

  private _editedFaq!:FaqDto ;
  @Input() set editedFaq(editedFaq:FaqDto) {
    this._editedFaq = editedFaq
    this.editedTitle = editedFaq.title
    this.editedAnswear = editedFaq.answer
    this.editedMaterialsId = editedFaq.materialsId
  }
  get editedFaq(): FaqDto{
      this._editedFaq.title = this.editedTitle;
      this._editedFaq.answer = this.editedAnswear;
      this._editedFaq.materialsId = this.editedMaterialsId;
      return this._editedFaq;
  }

  saveFaq():void{
    this.faqEdited.emit(this.editedFaq);
  }
  removeMaterials(){
    this.editedMaterialsId = null;
  }

}
