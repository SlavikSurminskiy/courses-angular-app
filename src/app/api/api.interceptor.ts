import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private BASE_URL = 'http://localhost:3004';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({ url: `${this.BASE_URL}/${req.url}` });

    return next.handle(request);
  }
}
