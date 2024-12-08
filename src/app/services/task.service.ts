import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://localhost:7097/api';

  constructor(private http: HttpClient) { }

  // Methods for loading data
  getAllNewbies(): Observable<{ id: string; name: string; surname: string }[]> {
    return this.http.get<{ id: string; name: string; surname: string }[]>(`${this.baseUrl}/NewbieMentor/GetAllNewbies`);
  }

  getAllTaskContents(): Observable<{ id: number; title: string }[]> {
    return this.http.get<{ id: number; title: string }[]>(`${this.baseUrl}/TaskContent/GetAll`);
  }

  getAllCategories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/Category/GetAll`);
  }

  // Methods for adding/editing tasks
  addTaskContent(taskData: {
    creatorId: string;
    categoryId: number;
    title: string;
    description: string;
    materialsId?: number | null;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/TaskContent/Add`, taskData);
  }

  editTaskContent(id: number, taskData: {
    creatorId: string;
    categoryId: number;
    title: string;
    description: string;
    materialsId?: number | null;
  }): Observable<any> {
    return this.http.put(`${this.baseUrl}/TaskContent/Edit/${id}`, taskData);
  }

  // Method for assigning tasks to users
  assignTaskToUser(taskAssignment: {
    newbieId: string;
    taskContentId: number;
    status: string;
    deadline: string;
    priority: number;
    state: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Task/AddTaskToUser`, taskAssignment);
  }
}