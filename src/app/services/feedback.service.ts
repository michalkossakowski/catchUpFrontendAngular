import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FeedbackDto } from '../Dtos/feedback.dto';
import { SchoolingDto } from '../Dtos/schooling.dto';
import { FullSchoolingDto } from '../Dtos/fullSchooling.dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url = 'https://localhost:7097/api/Feedback/';

  constructor(private http: HttpClient) {}

  getBySender(senderId: string): Observable<FeedbackDto[]> {
    return this.http.get<FeedbackDto[]>(`${this.url}GetBySenderId/${senderId}`)
      .pipe(
        catchError(this.handleError<FeedbackDto[]>('GetBySender', []))
      );
  }

  getByReceiver(receiverId: string): Observable<FeedbackDto[]> {
    return this.http.get<FeedbackDto[]>(`${this.url}GetByReceiverId/${receiverId}`)
      .pipe(
        catchError(this.handleError<FeedbackDto[]>('GetByReceiver', []))
      );
  }

  getById(feedbackId: number): Observable<FeedbackDto> {
    return this.http.get<FeedbackDto>(`${this.url}GetById/${feedbackId}`)
      .pipe(
        catchError(this.handleError<FeedbackDto>('GetById'))
      );
  }

  getAll(): Observable<FeedbackDto[]> {
    return this.http.get<FeedbackDto[]>(`${this.url}GetAll`)
      .pipe(
        catchError(this.handleError<FeedbackDto[]>('GetAll', []))
      );
  }

  add(feedback: FeedbackDto): Observable<FeedbackDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<FeedbackDto>(`${this.url}Add`, feedback, httpOptions)
      .pipe(
        catchError(this.handleError<FeedbackDto>('Add'))
      );
  }

  edit(feedbackId: number, feedback: FeedbackDto): Observable<FeedbackDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<FeedbackDto>(`${this.url}Edit/${feedbackId}`, feedback, httpOptions)
      .pipe(
        catchError(this.handleError<FeedbackDto>('Edit'))
      );
  }

  delete(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}Delete/${feedbackId}`)
      .pipe(
        catchError(this.handleError<void>('Delete'))
      );
  }

  getSchoolingById(resourceId: number): Observable<FullSchoolingDto> {
    return this.http.get<{message: string, fullSchoolingDto: FullSchoolingDto}>
        (`https://localhost:7097/api/Schooling/GetFull/${resourceId}`)
        .pipe(
            map(response => response.fullSchoolingDto)
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      if (error.status === 0) {
        return throwError(() => new Error('API is not available'));
      }
      return throwError(() => new Error(error.error?.message || 'Unknown error'));
    };
  }
}
