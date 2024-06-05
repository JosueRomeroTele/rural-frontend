import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router, private authApiService: AuthApiService, private http: HttpClient) { }


  public login(data:any):Observable<any>{
    return this.authApiService.login('login',data,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'auth-type': 'servicio'
      })
    })
  }

  public register(data:any):Observable<any>{
    return this.authApiService.register('register',data,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'auth-type': 'servicio'
      })
    })
  }
}
