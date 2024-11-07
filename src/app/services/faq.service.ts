import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FaqDto } from '../Dtos/faq.dto';
import { Observable, of } from 'rxjs';
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

  add(faq: FaqDto): Observable<FaqDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<FaqDto>(this.url + "Faq/Add", faq)
      .pipe(
        catchError(this.handleError<FaqDto>('add'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
}
