import { Component } from '@angular/core';
import { FileDto } from '../Dtos/file.dto';
import { FileService } from '../services/file.service';
@Component({
  selector: 'app-file',
  standalone: true,
  imports: [],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class FileComponent {
  constructor(private fileService: FileService) {}
}
