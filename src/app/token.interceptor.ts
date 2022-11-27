import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenString = localStorage.getItem('access_token');
    console.log(tokenString);
    const url = request.url;
    console.log(url);
    console.log(url.endsWith('/oauth/token'));

    if(tokenString  && !url.endsWith('/oauth/token')){
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      
      request = request.clone({ setHeaders : { Authorization: 'Bearer ' + jwt } })


      request = request.clone({
        setHeaders:{
          Authorization: 'Bearer '+jwt
        }
      })
    }
    
    return next.handle(request);
  }
}
