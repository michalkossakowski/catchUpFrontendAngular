import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../Dtos/category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly url = 'https://localhost:7097/api/Category/';

  constructor(private http: HttpClient) {}
  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.url}GetAll`);
  }
}
