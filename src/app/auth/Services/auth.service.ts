import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserInfo from '../Models/UserInfo';
import Bug from '../Models/Bug';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "https://localhost:44320/api/token"

  constructor( private http: HttpClient ) { }


  public register( user: UserInfo ): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Register', user)
  }

  public login ( user: UserInfo ): Observable<string> {
    return this.http.post(this.apiUrl, user, {
      responseType: 'text'
    })
  }

  CurrentUser(email:any, password: any) : Observable<UserInfo>{
    const url  = `${this.apiUrl}/currentUser?email=${email}&password=${password}`
    return this.http.get<UserInfo>(url)
  }

}
