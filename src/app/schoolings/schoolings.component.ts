import { Component } from '@angular/core';
import { FileComponent } from "../file/file.component";
import { MaterialComponent } from "../material/material.component";
import { MaterialItemComponent } from "../material/material-item/material-item.component";
import { AddFileComponent } from "../file/add-file/add-file.component";
@Component({
  selector: 'app-schoolings',
  standalone: true,
  imports: [
    FileComponent,
    MaterialComponent,
    MaterialItemComponent,
    AddFileComponent
],
  templateUrl: './schoolings.component.html',
  styleUrl: './schoolings.component.css'
})
export class SchoolingsComponent {}
