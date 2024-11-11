import { Component, EventEmitter, Output  } from '@angular/core';
import { FileService } from '../../services/file.service';
@Component({
  selector: 'app-add-file',
  standalone: true,
  imports: [],
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.css'
})

export class AddFileComponent {
  isFileOver: boolean = false; 

  constructor(private fileService: FileService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = true;
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFileOver = false;
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.uploadFile(file);
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }
  private uploadFile(file: File) {
    this.fileService.uploadFile(file).subscribe(
      (response: any) => console.log('File uploaded successfully:', response),
      (error: any) => console.error('File upload failed:', error)
    );
  }
}
