import { Component } from '@angular/core';
import { MaterialItemComponent } from "../material/material-item/material-item.component";
import { AddFileComponent } from "../file/add-file/add-file.component";
@Component({
  selector: 'app-schoolings',
  standalone: true,
  imports: [
    MaterialItemComponent,
    AddFileComponent
],
  templateUrl: './schoolings.component.html',
  styleUrl: './schoolings.component.css'
})
export class SchoolingsComponent {
  materialId : number = 0;

  onMaterialCreated(id: number): void {
    this.materialId = id;
  }
}

