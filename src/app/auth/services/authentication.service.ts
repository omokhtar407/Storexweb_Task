import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient , private _Router :Router) {
    if(localStorage.getItem('userToken') != null){
      this.saveUserData();
    }
  }

  saveUserData(){
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
  }

  register(formData:object):Observable<any>
  {
    return  this._HttpClient.post(`https://test-api.storexweb.com/api/register`,formData)
  }

  login(formData:object):Observable<any>
  {
    return  this._HttpClient.post(`https://test-api.storexweb.com/api/login`,formData)
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['login']);
  }

  getToken(){
    return localStorage.getItem('userToken') || ``;
  }
}
