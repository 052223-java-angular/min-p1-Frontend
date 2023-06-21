import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from 'src/app/models/CommentPayload';
import { ModifyCommentPayload } from 'src/app/models/ModifyCommentPayload';
import { ModifyPostPayload } from 'src/app/models/ModifyPostPayload';
import { Post } from 'src/app/models/Post';
import { PostPayload } from 'src/app/models/PostPayload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'http://localhost:8080/pokemon/api';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: sessionStorage.getItem('token') || ''
    })
  };
  constructor(private http: HttpClient) {


  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/all`);
  }

  newPost(payload: PostPayload): Observable<Post[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<Post[]>(`${this.baseUrl}/post/create`, payload, this.httpOptions);
  }

  modifyPost(payload: ModifyPostPayload): Observable<Post[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<Post[]>(`${this.baseUrl}/post/modify`, payload, this.httpOptions);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/post/${id}`);
  }

  newComment(payload: CommentPayload): Observable<Post> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<Post>(`${this.baseUrl}/comment/create`, payload, this.httpOptions);
  }

  modifyComment(payload: ModifyCommentPayload): Observable<Post> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', sessionStorage.getItem('token') || '');
    return this.http.post<Post>(`${this.baseUrl}/comment/modify`, payload, this.httpOptions);
  }
}
