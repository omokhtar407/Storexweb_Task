
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllMovies():Observable<any>
  {
    return  this._HttpClient.get(`https://test-api.storexweb.com/api/movies`);
  }


  getMoviesByCategory(id:number):Observable<any>
  {
    return  this._HttpClient.get(`https://test-api.storexweb.com/api/moviesByCategory/${id}`);
  }


  createMovie(formData:any):Observable<any>
  {
    return  this._HttpClient.post(`https://test-api.storexweb.com/api/movies`,formData);
  }


  ediMovie(formData:any,id:number):Observable<any>
  {
    return  this._HttpClient.post(`https://test-api.storexweb.com/api/movies/${id}`,formData);
  }

  delMovie(data:any , mov_cate_id:number):Observable<any>{
    let options ={
      Headers:new HttpHeaders({}),
      body:{
        _method:data._method
      }
    }
    return this._HttpClient.delete(`https://test-api.storexweb.com/api/movies/${mov_cate_id}`,options);
  }
}
