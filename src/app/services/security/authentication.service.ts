import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseData } from 'src/app/interfaces/dto/IResponseData';

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

  public register(data:any):Observable<IResponseData>{
    return this.authApiService.register('register',data,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'auth-type': 'servicio'
      })
    })
  }


  public cargarCredenciales(response:any,id:string){
    sessionStorage.setItem('id',  id)
    sessionStorage.setItem('role', response == undefined ? '' : response.role)
    sessionStorage.setItem('name', response == undefined ? '' : response.user)
    sessionStorage.setItem('token', response == undefined ? '' : response.token)
    sessionStorage.setItem('enable', response == undefined ? '' : response.enable)
  }

  public borrarCredenciales(){
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('enable')
  }
}
