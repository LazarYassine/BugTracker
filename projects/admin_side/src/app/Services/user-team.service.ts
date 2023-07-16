import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTeamService {

  constructor(private http: HttpClient) { }

  apiUrl = "https://localhost:44320/api/User_Team/"

  getAllUserTeams(): Observable<any>{
    return this.http.get<any[]>(this.apiUrl + 'GetAllUserTeamsWithDeteils')
  }

  GetUser_TeamListsByTeam(id: any): Observable<any>{
    return this.http.get<any[]>(this.apiUrl + `GetUser_TeamListsByTeam/${id}`)
  }

  CheckUserTeamExist(team_id: any, user_id: any) : Observable<any>{
    return this.http.get<any[]>(this.apiUrl + `CheckIfExist/${user_id}/${team_id}` )
  }

  AddUser_Team(user_team: any): Observable<any>{
    return this.http.post(this.apiUrl, user_team);
  }

  DeleteUser_Team(team_id: any, user_id: any): Observable<any>{
    return this.http.delete(this.apiUrl + `${user_id}/${team_id}`)
  }

}
