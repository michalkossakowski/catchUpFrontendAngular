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

  getAllUserSchoolings(userId: string): Observable<{ message: string; data: FullSchoolingDto[] }> {
    return this.http.get<{ message: string; data: FullSchoolingDto[] }>(`${this.url}GetAllFull/${userId}`);
  }

  createSchooling(schoolingDto: SchoolingDto): Observable<{ message: string; data: FullSchoolingDto}> {
    return this.http.post<{ message: string; data: FullSchoolingDto}>(`${this.url}Create`, schoolingDto) ;
  }

  getUserSchoolingsID(userId: string): Observable<{ message: string; data: number[]}> {
    return this.http.get<{ message: string; data: number[]}>(`${this.url}GetUserSchoolingsID/${userId}`)
  }

  addSchoolingToUser(userId: string, schoolingId: number) : Observable<{ message: string}>
  {
    return this.http.post<{ message: string}>(`${this.url}AddSchoolingToUser/${userId}/${schoolingId}`, null)
  }

  archiveUserSchooling(userId: string, schoolingId: number) : Observable<{ message: string}>
  {
    return this.http.post<{ message: string}>(`${this.url}ArchiveUserSchooling/${userId}/${schoolingId}`, null)
  }

  archiveSchooling(schoolingId: number) : Observable<{ message: string}>
  {
    return this.http.delete<{ message: string}>(`${this.url}ArchiveSchooling/${schoolingId}`)
  }

  editSchooling(schoolingDto: SchoolingDto) : Observable<{ message: string}>{
    return this.http.put<{ message: string}>(`${this.url}EditSchooling`, schoolingDto);
  }
}