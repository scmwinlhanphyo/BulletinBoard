import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login(payload: any): Promise<any> {
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/login`, payload, options));
  }

  public createUser(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users`, payload));
  }

  public getUsers(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users`, payload));
  }

  public findUser(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users`, payload));
  }

  public updateUser(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users`, payload));
  }

  public deleteUser(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users`, payload));
  }
}
