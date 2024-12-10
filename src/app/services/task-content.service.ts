import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskContentDto {
  id: number;
  creatorId?: string; // Guid as a string
  categoryId?: number;
  materialsId?: number;
  title?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskContentService {
  private baseUrl = 'https://localhost:7097/api/TaskContent';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskContentDto[]> {
    return this.http.get<TaskContentDto[]>(`${this.baseUrl}/GetAll`);
  }

  getById(taskContentId: number): Observable<TaskContentDto> {
    return this.http.get<TaskContentDto>(`${this.baseUrl}/GetById/${taskContentId}`);
  }

  add(taskContent: TaskContentDto): Observable<TaskContentDto> {
    return this.http.post<TaskContentDto>(`${this.baseUrl}/Add`, taskContent);
  }

  edit(taskContentId: number, taskContent: TaskContentDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/Edit/${taskContentId}`, taskContent);
  }

  delete(taskContentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${taskContentId}`);
  }

  getByTitle(title: string): Observable<TaskContentDto[]> {
    return this.http.get<TaskContentDto[]>(`${this.baseUrl}/GetByTitle/${title}`);
  }

  getByCreatorId(creatorId: string): Observable<TaskContentDto[]> {
    return this.http.get<TaskContentDto[]>(`${this.baseUrl}/GetByCreatorId/${creatorId}`);
  }

  getByCategoryId(categoryId: number): Observable<TaskContentDto[]> {
    return this.http.get<TaskContentDto[]>(`${this.baseUrl}/GetByCategoryId/${categoryId}`);
  }
}
