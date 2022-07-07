import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected authUserSubject = new Subject<any>();
  authUser$: Observable<any> = this.authUserSubject.asObservable();

  constructor() { }

  async isLoggedIn() {
    if (localStorage.getItem('userId')) {
      await this.authUserSubject.next(localStorage.getItem('userId'));
    } else {
      await this.authUserSubject.next(null);
    }
  }
}
