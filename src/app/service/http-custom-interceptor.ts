/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { map, catchError, filter, switchMap, take} from 'rxjs/operators';
import { AuthService } from '../core/login/auth.service';

@Injectable({ providedIn: 'root' })
//Called once, before the instance is destroyed.
//Add 'implements OnDestroy' to the class.
export class HttpCustomInterceptor implements HttpInterceptor, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(
    private service: AuthService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const _userLogged = this.service.isLogged();

    if (_userLogged && request.url.indexOf('Refresh') <= 0) {
      const _tokenSessionString =
        localStorage.getItem(SessionKey.TOKEN_DATA_SESSION) ?? '';
      const _tokenSession = JSON.parse(_tokenSessionString);
      request = this.addToken(request, _tokenSession.token);
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Error custom message Http interceptor 401 //
          return this.handle401Error(request, next);
        } else if (err.status === 403) {
          //this.route.navigateByUrl('access-denied');
        } else {
          if (err.status === 500 && _userLogged) {
            // Error custom message Http interceptor 500 //
          }
        }

        return throwError(() => new Error('HTTP Error'));
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        // eslint-disable-next-line quote-props
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.service.refreshToken().pipe(
        switchMap((jwt: IToken) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(jwt.token);
          return next.handle(this.addToken(request, jwt.token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}



