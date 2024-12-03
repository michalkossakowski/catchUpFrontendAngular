import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../Dtos/user.dto';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewbieMentorService {
  private url = 'https://localhost:7097/api/NewbieMentor/';

  constructor(private http: HttpClient) { }

  getAllNewbies(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.url}GetAllNewbies`)
  }
}
