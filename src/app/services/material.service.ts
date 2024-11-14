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

  getMaterialWithFiles(materialId: number): Observable<{ message: string, materialDto: MaterialDto }> {
    return this.http.get<{ message: string, materialDto: MaterialDto }>(`${this.url}GetWithFiles/${materialId}`)
  }
  removeFile(materialId: Number, fileId: Number): Observable<any>{
    return this.http.post(`${this.url}RemoveFile/${materialId}/${fileId}`,null)
  }
  createMaterial(material: { name: string }): Observable<{material: MaterialDto, message: string}> {
    return this.http.post<{material: MaterialDto, message: string}>(`${this.url}Create`, material);
  }
  deleteMaterial(materialId: Number): Observable<any>{
    return this.http.delete(`${this.url}Delete/${materialId}`)
  }
}
