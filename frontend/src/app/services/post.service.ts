import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getPosts(): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('userType', userData.type)
      .set('userId', userData._id)
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.get(`${process.env['apiUrl']}/posts`, options));
  }

  public createPost(payload: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/posts`, payload, options));
  }

  public findPost(postId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.get(`${process.env['apiUrl']}/posts/` + postId, options));
  }

  public updatePost(payload: any, postId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.put(`${process.env['apiUrl']}/posts/` + postId, payload, options));
  }

  public deletePost(postId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.delete(`${process.env['apiUrl']}/posts/` + postId, options));
  }

  public findByName(payload: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userType', userData.type)
      .set('userId', userData._id);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/posts/search`, payload, options));
  }
}
