import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Credentials } from './login/credentials';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url : string = "http://localhost:8080/login";


  constructor(
    private http : HttpClient

  ) { }



  login(creds : Credentials){
    return this.http.post(this.url,creds,{
      observe : 'response'
    }).pipe(map((response : HttpResponse<any>) => {

      console.log(response);

      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken.replace('Bearer ', '');

      localStorage.setItem('token',token);
      return body;
    }))    
  }

  getToken(){
    return localStorage.getItem('token');
  }


}
