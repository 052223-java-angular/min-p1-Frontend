import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /* --------------------------- Methods --------------------------- */

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/register`, payload);
  }
}
