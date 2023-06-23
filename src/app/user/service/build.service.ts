import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildPayload } from 'src/app/models/BuildPayload';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  baseUrl = 'http://localhost:8080/pokemon/api';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('token') || ''
    })
  };
  constructor(private http: HttpClient) { }

  newBuild(payload: BuildPayload): Observable<any[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<any[]>(`${this.baseUrl}/build/create`, payload, this.httpOptions);
  }
}
