import { Injectable } from '@angular/core';
import { MaterialDto } from '../Dtos/material.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private readonly url = 'https://localhost:7097/api/Material/';

  constructor(private http: HttpClient) {}

  // Create Material
  createMaterial(material: MaterialDto): Observable<any> {
    return this.http.post(`${this.url}Create`, material);
  }

  // Edit Material Name
  editMaterial(materialId: number, name: string): Observable<any> {
    return this.http.put(`${this.url}Edit/${materialId}/${name}`, {});
  }

  // Delete Material
  deleteMaterial(materialId: number): Observable<any> {
    return this.http.delete(`${this.url}Delete/${materialId}`);
  }

  // Add File to Material
  addFileToMaterial(materialId: number, fileId: number): Observable<any> {
    return this.http.post(`${this.url}AddFile/${materialId}/${fileId}`, {});
  }

  // Remove File from Material
  removeFileFromMaterial(materialId: number, fileId: number): Observable<any> {
    return this.http.post(`${this.url}RemoveFile/${materialId}/${fileId}`, {});
  }

  // Get Material by ID
  getMaterialById(materialId: number): Observable<any> {
    return this.http.get(`${this.url}Get/${materialId}`);
  }

  // Get Material with Files
  getMaterialWithFiles(materialId: number): Observable<any> {
    return this.http.get(`${this.url}GetWithFiles/${materialId}`);
  }

  // Get All Materials
  getAllMaterials(): Observable<MaterialDto[]> {
    return this.http.get<MaterialDto[]>(`${this.url}GetAllMaterials`);
  }
}
