import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../Dtos/Category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly url = 'https://localhost:7097/api/Category/';

  constructor(private http: HttpClient) {}
  getCategories(): Observable<{data: CategoryDto[] }> {
    return this.http.get<{data: CategoryDto[] }>(`${this.url}GetAll`);
  }
}
