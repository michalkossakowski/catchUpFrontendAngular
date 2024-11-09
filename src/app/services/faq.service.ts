import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FaqDto } from '../Dtos/faq.dto';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FaqService {
  private url = 'https://localhost:7112/api/Faq/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<FaqDto[]> {
    return this.http.get<FaqDto[]>(this.url+"GetAll")
      .pipe(
        catchError(this.handleError<FaqDto[]>('getAll', []))
      );
  }

  getByTitle(title: string): Observable<FaqDto[]> {
    return this.http.get<FaqDto[]>(this.url+"GetByTitle/"+title)
      .pipe(
        catchError(this.handleError<FaqDto[]>('GetByTitle', []))
      );
  }

  add(faq: FaqDto): Observable<FaqDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<FaqDto>(this.url + "Add", faq)
      .pipe(
        catchError(this.handleError<FaqDto>('add'))
      );
  }
  
  edit(faq: FaqDto): Observable<FaqDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<FaqDto>(this.url + "Edit/"+faq.id, faq)
      .pipe(
        catchError(this.handleError<FaqDto>('edit'))
      );
  }

  delete(faq: FaqDto): Observable<FaqDto> {
    return this.http.delete<FaqDto>(this.url + "Delete/" + faq.id)
      .pipe(
        catchError(this.handleError<FaqDto>('delete'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      if(error.status == 0){
        return throwError(() => new Error('API is not available'));
      }
      return throwError(() => new Error(error.error.message));
    };
  }
}
