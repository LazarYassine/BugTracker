import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserInfo from '../Models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host: string = "https://localhost:44320/api/token"

  constructor( private http: HttpClient ) { }


  public register( user: UserInfo ): Observable<any> {
    return this.http.post<any>(this.host + '/Register', user)
  }

  public login ( user: UserInfo ): Observable<string> {
    return this.http.post(this.host, user, {
      responseType: 'text'
    })
  }


}
