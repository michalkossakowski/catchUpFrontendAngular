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

  getById(userId: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.url}GetById/${userId}`)
      .pipe(
          catchError(this.handleError<UserDto>('getById'))
      );
  }

  getLoggedInUser(): UserDto | undefined{ 
    try {
      const userString = localStorage.getItem('user');
      if(userString){
        const parsedUser = JSON.parse(userString);
        const userDto = new UserDto(
          parsedUser.name,
          parsedUser.surname,
          parsedUser.email,
          parsedUser.password,
          parsedUser.type,
          parsedUser.position
        )
        return userDto;
      }
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
    }
    return undefined
  }

  getRole(userId: string): Observable<string> {
    return this.http.get(`${this.url}GetRole/${userId}`, { responseType: 'text' })
        .pipe(
            catchError(this.handleError<string>('getRole'))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      if (error.status === 0) {
        return throwError(() => new Error('API is not available'));
      }
      return throwError(() => new Error(error.error?.message || 'Unknown error occurred'));
    };
  }
}
