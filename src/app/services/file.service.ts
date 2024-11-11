import { Injectable } from '@angular/core';
import { FileDto } from '../Dtos/file.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = 'https://localhost:7097/api/File/';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, materialId?: number): Observable<any>
  {
    const formData = new FormData();
    formData.append('file', file)
    if (materialId) {
      formData.append('materialsId', materialId.toString());
    }
    return this.http.post(`${this.url}Upload/`, formData)
  }
}
