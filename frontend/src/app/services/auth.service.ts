import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected authUserSubject = new Subject<any>();
  authUser$: Observable<any> = this.authUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  async isLoggedIn() {
    if (localStorage.getItem('userLoginData')) {
      await this.authUserSubject.next(localStorage.getItem('userLoginData'));
    } else {
      await this.authUserSubject.next(null);
    }
  }

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
    return lastValueFrom(this.http.post(`${environment.apiUrl}/logout`, {}, options));
  }

  public forgetPassword(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/forgot-password`, payload));
  }

  // public resetPassword(id: string, token: string): Promise<any> {
  //   return lastValueFrom(this.http.get(`${environment.apiUrl}/password-reset/${id}/${token}`));
  // }

  public resetPasswordUpdate(id: string, token: string, payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/password-reset-update/${id}/${token}`, payload));
  }

  public passwordChange(id: string, payload: any, token: string): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/password-change/${id}/${token}`, payload));
  }
}
