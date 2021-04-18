import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private BASE_URL = 'http://localhost:3004';

  constructor(private _auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: `${this.BASE_URL}/${req.url}`,
      headers: new HttpHeaders({
        Authorization: this._auth.getToken(),
      }),
    });

    return next.handle(request);
  }
}
