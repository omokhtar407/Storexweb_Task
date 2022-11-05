import { AuthenticationService } from './authentication.service';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable ,Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _Injector:Injector ,private http:HttpClient) { }

  intercept(req :HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    let authService = this._Injector.get(AuthenticationService)
    let token = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(token)
  }
}
