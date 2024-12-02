import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullSchoolingDto } from '../Dtos/fullSchooling.dto';
import { SchoolingDto } from '../Dtos/schooling.dto';

@Injectable({
  providedIn: 'root'
})
export class SchoolingService {
  private readonly url = 'https://localhost:7097/api/Schooling/';

  constructor(private http: HttpClient) {}

  getAllSchoolings(): Observable<{ message: string; data: FullSchoolingDto[] }> {
    return this.http.get<{ message: string; data: FullSchoolingDto[] }>(`${this.url}GetAllFull`);
  }

  createSchooling(schoolingDto: SchoolingDto): Observable<any> {
    return this.http.post<any>(`${this.url}/Create`, schoolingDto);
  }

}