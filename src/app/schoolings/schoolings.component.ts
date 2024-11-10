import { Component } from '@angular/core';
import { FileComponent } from "../file/file.component";
import { MaterialComponent } from "../material/material.component";
@Component({
  selector: 'app-schoolings',
  standalone: true,
  imports: [
    FileComponent,
    MaterialComponent,
],
  templateUrl: './schoolings.component.html',
  styleUrl: './schoolings.component.css'
})
export class SchoolingsComponent {

}
