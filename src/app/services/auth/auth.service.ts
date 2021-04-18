import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthUser, LoginResponse, UserInfo } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LS_USER = 'USER';

  constructor(private _http: HttpClient) {}

  login(user: AuthUser): Observable<LoginResponse> {
    return this._http.post<LoginResponse>('auth/login', {
      login: user.email,
      password: user.password
    });
  }

  logout(): void {
    localStorage.removeItem(this.LS_USER);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.LS_USER) !== null;
  }

  getUserInfo(): Observable<UserInfo> {
    return this._http.post<UserInfo>('auth/userinfo', {
      token: this.getToken(),
    });
  }

  getToken(): string {
    return localStorage.getItem(this.LS_USER) || '';
  }

  saveToken(token: string): void {
    localStorage.setItem(this.LS_USER, token);
  }
}
