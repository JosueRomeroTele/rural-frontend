import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServicesService } from './api-services.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private myUri :string;
  private endPoint: string='api/user';

  constructor(private http: HttpClient,private userService:ApiServicesService) {
   }

   public listUser(){
    return this.userService.list(this.endPoint+'/list',{
      headers : new Headers({
        'Content-Type': 'application/json; charset=utf-8',

      })
    })
   }

}
