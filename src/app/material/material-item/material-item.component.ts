import { Component } from '@angular/core';
import { FileDto } from '../../Dtos/file.dto';
import { FileService } from '../../services/file.service';
import { MaterialDto } from '../../Dtos/material.dto';
import { MaterialService } from '../../services/material.service';
@Component({
  selector: 'app-material-item',
  standalone: true,
  imports: [],
  templateUrl: './material-item.component.html',
  styleUrl: './material-item.component.css'
})
export class MaterialItemComponent {
  material!: MaterialDto;
  constructor(private materialService: MaterialService){}

  ngOnInit (): void {
    this.getMaterial(1); 
  }
  getMaterial(materialId: number){
    this.materialService.getMaterialWithFiles(materialId).subscribe(m => this.material = m.materialDto)
  }
}


