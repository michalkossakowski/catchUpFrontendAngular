import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { MaterialDto } from '../../Dtos/material.dto';
import { FileDto } from '../../Dtos/file.dto';
import { MaterialService } from '../../services/material.service';
import { AddFileComponent } from '../../file/add-file/add-file.component'
import { FileService } from '../../services/file.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-material-item',
  standalone: true,
  imports: [AddFileComponent, FormsModule],
  templateUrl: './material-item.component.html',
  styleUrl: './material-item.component.css'
})
export class MaterialItemComponent {
  material!: MaterialDto;
  materialName!: string;

  @Input() materialId: number = 0;
  @Input() showRemoveFile: boolean = false;  
  @Input() showDownloadFile: boolean = false;  
  @Input() showAddingFile: boolean = false;  

  @Output() materialCreated = new EventEmitter<number>(); // Emituje ID nowo utworzonego materiału

  url! :string;
  constructor(private materialService: MaterialService, private fileService: FileService){}
  ngOnInit (): void {
    if(this.materialId!=0)
      this.getMaterial(this.materialId);
  }
  removeFile(fileId: number) : void {
    this.materialService.removeFile(this.material.id,fileId).subscribe(()=>
      {
        this.getMaterial(this.material.id)
      })
  }
  downloadFile(fileId: number) : void {
    this.fileService.downloadFile(fileId).subscribe(blob =>{
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `file`; 
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }
  onFileUploaded(file: FileDto): void {
    this.material.files?.push(file)
  }
  getMaterial(materialId: number)
  {
    this.materialService.getMaterialWithFiles(materialId).subscribe(m => this.material = m.materialDto)
  }

  loadImage(fileId: number): void {
    this.fileService.downloadFile(fileId).subscribe(blob =>{
        this.url = URL.createObjectURL(blob);
      },
    );
  }
  createMaterial(): void {
    if(this.materialName)
      this.materialService.createMaterial({name: this.materialName}).subscribe({
        next: response => {
          console.log('Material created:', response)
          this.materialCreated.emit(response.material.id)
          this.materialId = response.material.id
          this.getMaterial(this.materialId)
        },
        error: error => console.error('Error creating material:', error)
      });
  }
}