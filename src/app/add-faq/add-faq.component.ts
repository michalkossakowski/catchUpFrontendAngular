import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { FaqDto } from '../Dtos/faq.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-faq',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-faq.component.html',
  styleUrl: './add-faq.component.css'
})
export class AddFaqComponent {
  public title!:string;
  public answear!:string;
  public materials!:number;
  @Output() faqAdded: EventEmitter<FaqDto> = new EventEmitter();
  
  AddNewFaq():void{
    let newFaq = new FaqDto(this.title,this.answear,this.materials)
    this.faqAdded.emit(newFaq);
  }
}
