import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getPosts(payload: any): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/posts`, payload));
  }

  public createPost(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/posts`, payload));
  }

  public findPost(payload: any, postId: any): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/posts/` + postId, payload));
  }

  public updatePost(payload: any, postId: any): Promise<any> {
    return lastValueFrom(this.http.put(`${environment.apiUrl}/posts/` + postId, payload));
  }

  public deletePost(postId: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/posts/` + postId));
  }

  public findByName(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/posts/search`, payload));
  }
}
