import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponseData } from '../interfaces/dto/IResponseData';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  private domain :string;
  constructor(private http:HttpClient) {
    this.domain = environment.hostBackend + ':'+environment.portBackend;
   }

   list(path:string,httpOptions:object):Observable<IResponseData>{
    return this.http.get<IResponseData>(
      `${this.domain}/${path}`, httpOptions
    );
   }



}
