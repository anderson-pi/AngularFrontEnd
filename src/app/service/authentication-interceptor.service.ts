import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem("username") && sessionStorage.getItem("token")!= null) {
      req = req.clone({ headers: req.headers.set("Authorization",
       'Bearer ' + sessionStorage.getItem("token"))
      });
    }
    return next.handle(req);
  }
}
