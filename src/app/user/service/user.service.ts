import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/models/Auth';
import { RegisterPayload } from 'src/app/models/RegisterPayload';
import { LoginPayload } from 'src/app/models/LoginPayload';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from 'src/app/models/User'
import { ModifySignaturePayload } from 'src/app/models/ModifySignaturePayload';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8080/pokemon/api';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('token') || ''
    })
  };

  constructor(private http: HttpClient) { }

  /* --------------------------- Methods --------------------------- */

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/register`, payload);
  }

  getUser(): Observable<User> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');

    return this.http.get<User>(`${this.baseUrl}/auth/${sessionStorage.getItem('id')}`, this.httpOptions);
  }

  modifySignature(payload: ModifySignaturePayload): Observable<User> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');

    return this.http.post<User>(`${this.baseUrl}/auth/ModifySignature`, payload, this.httpOptions);
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
