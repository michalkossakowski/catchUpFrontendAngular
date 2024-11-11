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
    return this.http.get<{ message: string, materialDto: MaterialDto }>(`${this.url}GetWithFiles/${materialId}`);
  }

}
