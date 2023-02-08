import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/Operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesResolver implements Resolve<boolean> {

  constructor(private _HttpClient:HttpClient,private toastr: ToastrService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._HttpClient.get<any>(environment.baseUrl).pipe(
      catchError((error)=>{
        return of('No Movies');
      })
    )

  }
}
