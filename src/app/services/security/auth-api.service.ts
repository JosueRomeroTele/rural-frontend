import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private endpoint = 'auth';
  private domain : string | undefined;

  constructor(private http: HttpClient) {
    this.domain = environment.hostBackend + ':'+environment.portBackend
  }


  login(path: string, data: any,httpOptions:object): Observable<any> {
    return this.http.post<any>(
      `${this.domain}/${this.endpoint}/${path}`,data, httpOptions);
  }

  register(path: string, data: any,httpOptions:object): Observable<any>{
    return this.http.post<any>(
      `${this.domain}/${this.endpoint}/${path}`,data, httpOptions);
  }
}
