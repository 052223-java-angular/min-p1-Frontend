import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModifyPostPayload } from 'src/app/models/ModifyPostPayload';
import { Post } from 'src/app/models/Post';
import { PostPayload } from 'src/app/models/PostPayload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'http://localhost:8080/pokemon/api';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/all`);
  }

  newPost(payload: PostPayload): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.baseUrl}/post/create`, payload);
  }

  modifyPost(payload: ModifyPostPayload): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.baseUrl}/post/modify`, payload);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/post/${id}`);
  }
}
