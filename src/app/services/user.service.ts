import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/enviroment';
import { Usuario } from '../interfaces/dto/IUsuarioDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private myUri :string;
  private myApi: string;

  constructor(private http: HttpClient) {
    // this.myUri = environment.endpoint;
    this.myApi = 'api/user/list'
   }


  //  getListUsuarios(): Observable<Usuario[]>{
  //   // return this.http.get<Usuario[]>(this.myUri+this.myApi)
  //  }
}
