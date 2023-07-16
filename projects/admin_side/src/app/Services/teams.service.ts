import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Team from '../Models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  apiUrl = "https://localhost:44320/api"

  constructor( private http: HttpClient ) { }

  getAllTeams() : Observable<any> {
    return this.http.get(this.apiUrl + "/Team/getAllTeamsWithLeaderInfo")
  }

  deleteTeam(id: number) {
    var url = `${this.apiUrl}/Team/${id}`
    return this.http.delete( url );
  }

  editTeam(id: number, team: Team): Observable<Team> {
    const url = `${this.apiUrl}/Team/${id}`;
    return this.http.put<Team>(url, team);
  }

  addTeam(team: Team) {
    return this.http.post(this.apiUrl + '/Team', team)
  }

}
