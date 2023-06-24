import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteTeamPayLoad } from 'src/app/models/DeleteTeamPayload';
import { TeamPayload } from 'src/app/models/TeamPayload';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = 'http://localhost:8080/pokemon/api';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('token') || ''
    }),
    params: new HttpParams().set('user_id', sessionStorage.getItem('id') || '')
  };

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    this.httpOptions.params = this.httpOptions.params.set('user_id', sessionStorage.getItem('id') || '');
    return this.http.get<any[]>(`${this.baseUrl}/team/`, this.httpOptions);
  }

  newTeam(payload: TeamPayload): Observable<any[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<any[]>(`${this.baseUrl}/team/create`, payload, this.httpOptions);
  }
  modifyTeam(payload: TeamPayload): Observable<any[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<any[]>(`${this.baseUrl}/team/modify`, payload, this.httpOptions);
  }
  deleteTeam(payload: DeleteTeamPayLoad): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<any[]>(`${this.baseUrl}/team/delete`, payload, this.httpOptions);
  }
}
