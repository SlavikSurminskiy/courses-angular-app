import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private SERVER_BASE_URL = 'http://localhost:3004';
  private APP_BASE_URL = 'http://localhost:4200';

  constructor(private _auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let BASE_URL = this.SERVER_BASE_URL;

    if (req.url.includes('assets/i18n')) {
      BASE_URL = this.APP_BASE_URL;
    }

    const request = req.clone({
      url: `${BASE_URL}/${req.url}`,
      headers: new HttpHeaders({
        Authorization: this._auth.getToken(),
      }),
    });

    return next.handle(request);
  }
}
