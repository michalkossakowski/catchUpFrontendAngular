import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeedbackDto } from '../Dtos/feedback.dto';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private fakeFeedbacks: FeedbackDto[] = [
    new FeedbackDto('sender1', 'receiver1', 'Feedback 1', 'Description 1', 'http://localhost:4200/material/1'),
    new FeedbackDto('sender2', 'receiver1', 'Feedback 2', 'Description 2', 'http://localhost:4200/task/1'),
  ];

  constructor() {}

  getBySender(senderId: string): Observable<FeedbackDto[]> {
    const feedbacks = this.fakeFeedbacks;
    return of(feedbacks);
  }

  getByReciver(reciverId: string): Observable<FeedbackDto[]> {
    const feedbacks = this.fakeFeedbacks;
    return of(feedbacks);
  }

  add(feedback: FeedbackDto): Observable<FeedbackDto> {
    this.fakeFeedbacks.push(feedback);
    return of(feedback);
  }


  // private url = 'https://localhost:7097/api/Feedback/';

  // constructor(private http: HttpClient) { }

  // getBySender(senderId: string): Observable<FeedbackDto[]> {
  //   return this.http.get<FeedbackDto[]>(this.url+"GetBySender/"+senderId)
  //     .pipe(
  //       catchError(this.handleError<FeedbackDto[]>('GetBySender', []))
  //     );
  // }

  // getByReciver(reciverId: string): Observable<FeedbackDto[]> {
  //   return this.http.get<FeedbackDto[]>(this.url+"GetByReciver/"+reciverId)
  //     .pipe(
  //       catchError(this.handleError<FeedbackDto[]>('GetByReciver', []))
  //     );
  // }

  // add(feedback: FeedbackDto): Observable<FeedbackDto> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.http.post<FeedbackDto>(this.url + "Add", feedback)
  //     .pipe(
  //       catchError(this.handleError<FeedbackDto>('add'))
  //     );
  // }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(operation + ' failed' + error);
  //     if(error.status == 0){
  //       return throwError(() => new Error('API is not available'));
  //     }
  //     return throwError(() => new Error(error.error.message));
  //   };
  // }
}
