import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxUploadService {

  constructor(private http: HttpClient) {}

  upload(url: string, formData: FormData): Observable<any> {
    return this.http.post(`${url}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  delete(url: string, id: number) {
    return this.http.delete(`${url}/${id}`);
  }

}
