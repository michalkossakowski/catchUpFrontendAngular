import { Injectable } from '@angular/core';
import { FileDto } from '../Dtos/file.dto';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = 'https://localhost:7097/api/File/';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, materialId?: number): Observable<{ message: string; fileDto: FileDto; materialId: number }>
  {
    const formData = new FormData();
    formData.append('file', file)

    let params = new HttpParams();
    if (materialId !== undefined) {
      params = params.set('materialId', materialId.toString());
    }

    return this.http.post<{ message: string; fileDto: FileDto; materialId: number }>(`${this.url}Upload`, formData, {
      params: params
    });
  }
  downloadFile(fileId: number): Observable<Blob>
  {
    return this.http.get(`${this.url}Download/${fileId}`,{
      responseType: 'blob'
    })
  }
}
