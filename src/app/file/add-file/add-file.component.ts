import { Component, EventEmitter, Input, output, Output  } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileDto } from '../../Dtos/file.dto';
@Component({
  selector: 'app-add-file',
  standalone: true,
  imports: [],
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.css'
})

export class AddFileComponent {
  @Input() materialId: number = 0;
  @Output() fileUploaded = new EventEmitter<FileDto>();
  isFileOver: boolean = false; 

  constructor(private fileService: FileService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = true;
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
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
    console.log(this.materialId)
    if (this.materialId !== 0) {
      this.fileService.uploadFile(file, this.materialId).subscribe(
        response => 
          {
          console.log('File uploaded successfully:', response)
          this.fileUploaded.emit(response.fileDto);
          },
        error => console.error('File upload failed:', error)
      );
    } else {
      this.fileService.uploadFile(file).subscribe(
        response => 
          {
          console.log('File uploaded successfully:', response)
          this.fileUploaded.emit(response.fileDto);
          },
        error => console.error('File upload failed:', error)
      );
    }
  }
}
