import { Component, OnInit } from '@angular/core';
import { SchoolingsListComponent } from "./schooling-list/schooling-list.component";
import { SchoolingCreateComponent } from "./schooling-create/schooling-create.component";
// import { MaterialItemComponent } from "../material/material-item/material-item.component";
// import { AddFileComponent } from "../file/add-file/add-file.component";
@Component({
  selector: 'app-schoolings',
  standalone: true,
  imports: [
    SchoolingsListComponent,
    SchoolingCreateComponent
],
  templateUrl: './schoolings.component.html',
  styleUrl: './schoolings.component.css'
})
export class SchoolingsComponent {


}

