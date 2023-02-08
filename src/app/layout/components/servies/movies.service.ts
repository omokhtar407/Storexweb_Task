
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) { }

  getMoviesByCategory(id:number):Observable<any>
  {
    return  this._HttpClient.get(environment.baseUrl + `ByCategory/${id}`);
  }

  createMovie(formData:any):Observable<any>
  {
    return  this._HttpClient.post(environment.baseUrl,formData);
  }


  ediMovie(formData:any,id:number):Observable<any>
  {
    return  this._HttpClient.post(environment.baseUrl + `/${id}`,formData);
  }

  delMovie(data:any , mov_cate_id:number):Observable<any>{
    let options ={
      Headers:new HttpHeaders({}),
      body:{
        _method:data._method
      }
    }
    return this._HttpClient.delete(environment.baseUrl + `/${mov_cate_id}`,options);
  }
}
