import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public dataSubject : Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  public login(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/login`, payload));
  }

  public logout(): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users/logout`, {}, options));
  }

  public createUser(payload: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users`, payload, options));
  }

  public getUsers(pageSize: number, pageIndex: number): Promise<any> {
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
    return lastValueFrom(this.http.get(`${environment.apiUrl}/users?page=${pageIndex}&upp=${pageSize}`, options));
  }

  public findUser(payload: any, userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users/` + userId, payload, options));
  }

  public updateUser(payload: any, userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.put(`${environment.apiUrl}/users/` + userId, payload, options));
  }

  public deleteUser(userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/users/` + userId, options));
  }

  public createAccount(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/signup`, payload));
  }

  public findByName(pageSize: number, pageIndex: number, payload: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userType', userData.type)
      .set('userId', userData._id);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users/search?page=${pageIndex}&upp=${pageSize}`, payload, options));
  }
}
