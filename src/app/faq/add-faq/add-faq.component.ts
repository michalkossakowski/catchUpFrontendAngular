import { Component, EventEmitter, input, Input, Output  } from '@angular/core';
import { FaqDto } from '../../Dtos/faq.dto';
import { FormsModule } from '@angular/forms';
import { MaterialItemComponent } from "../../material/material-item/material-item.component";

@Component({
  selector: 'app-add-faq',
  standalone: true,
  imports: [FormsModule, MaterialItemComponent],
  templateUrl: './add-faq.component.html',
  styleUrl: './add-faq.component.css'
})
export class AddFaqComponent {
  public title!:string;
  public answear!:string;
  public materialsId!:number;
  @Output() faqAdded: EventEmitter<FaqDto> = new EventEmitter();

  onMaterialCreated(mid: number) {
    this.materialsId = mid;
  }
  addNewFaq():void{
    let newFaq = new FaqDto(this.title,this.answear,this.materialsId)
    this.faqAdded.emit(newFaq);
  }
}
