import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../Dtos/user.dto';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://localhost:7097/api/User/';

  constructor(private http: HttpClient) { }

  add(user: UserDto): Observable<UserDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<UserDto>(this.url + "Add", user)
      .pipe(
        catchError(this.handleError<UserDto>('add'))
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
