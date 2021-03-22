import { Injectable } from '@angular/core';
import { IUser } from '../../shared/models/user.model';
import { AuthUser } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LS_USER = 'USER';

  private fakeUser: IUser = {
    firstName: 'test-first-name',
    lastName: 'test-last-name',
    id: '01',
  };

  constructor() { }

  login(user: AuthUser): void {
    localStorage.setItem(this.LS_USER, JSON.stringify({
      ...this.fakeUser,
      email: user.email,
      token: `${user.password}-token`,
    }));

    console.log('Logged in');
  }

  logout(): void {
    console.log('Logout ', this.getUserInfo().firstName);
    localStorage.removeItem(this.LS_USER);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.LS_USER) !== null;
  }

  getUserInfo(): IUser {
    const user = localStorage.getItem(this.LS_USER);

    return user ? JSON.parse(user) : {};
  }
}
