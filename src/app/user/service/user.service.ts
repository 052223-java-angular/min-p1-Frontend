import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/models/Auth';
import { RegisterPayload } from 'src/app/models/RegisterPayload';
import { LoginPayload } from 'src/app/models/LoginPayload';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from 'src/app/models/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8080/pokemon/api';

  constructor(private http: HttpClient) { }

  /* --------------------------- Methods --------------------------- */

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/register`, payload);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/${sessionStorage.getItem('id')}`);
  }

  samePasswordValidator(
    passwordControl: AbstractControl,
    confirmedPasswordControl: AbstractControl
  ): ValidatorFn {
    return () => {
      return passwordControl?.value === confirmedPasswordControl?.value ? null : { notSame: true };
    };
  }
}
