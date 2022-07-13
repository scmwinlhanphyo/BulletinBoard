import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/login`, payload));
  }

  public logout(): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/users/logout`, {}, options));
  }

  public createUser(payload: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/users`, payload, options));
  }

  public getUsers(payload: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`)
      .set('userType', userData.type)
      .set('userId', userData._id);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.get(`${process.env['apiUrl']}/users`, options));
  }

  public findUser(payload: any, userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/users/` + userId, payload, options));
  }

  public updateUser(payload: any, userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.put(`${process.env['apiUrl']}/users/` + userId, payload, options));
  }

  public deleteUser(userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.delete(`${process.env['apiUrl']}/users/` + userId, options));
  }

  public createAccount(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/signup`, payload));
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
    return lastValueFrom(this.http.post(`${process.env['apiUrl']}/users/search`, payload, options));
  }
}
