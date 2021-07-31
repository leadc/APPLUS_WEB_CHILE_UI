import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let handled: Observable<HttpEvent<unknown>>;
    if (!this.tokenService.accessToken) {
      handled = next.handle(request);
    } else {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `${this.tokenService.accessToken}`)
      });
      handled = next.handle(authRequest);
    }
    return handled.pipe(
      map((httpEvent) => {
        if (httpEvent.type === 0) {
          return httpEvent;
        }
        if (httpEvent instanceof HttpResponse) {
          if (httpEvent.headers.has('Authorization')) {
            this.tokenService.accessToken = httpEvent.headers.get('Authorization');
          }
        }
        return httpEvent;
      })
    );
  }
}
