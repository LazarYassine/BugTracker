import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectBug } from '../Models/ProjectBug';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectBugsServiceService {

  apiUrl = "https://localhost:44320/api"

  constructor(private http: HttpClient) { }

  getProjectBugs() {
    return this.http.get<any>(this.apiUrl + '/ProjectBug')
  }

  getBugWithProjectInfo() {
    return this.http.get<any>(this.apiUrl + '/ProjectBug/getBugWithProjectInfo')
  }

   addProjectBug(projectBug: ProjectBug) {
     return this.http.post(this.apiUrl + '/ProjectBug', projectBug)
  }

  editProjectBug(id: number, projectBug: ProjectBug): Observable<ProjectBug> {
    const url = `${this.apiUrl}/ProjectBug/${id}`;
    return this.http.put<ProjectBug>(url, projectBug);
  }


  deleteProjectBug(id: number) {
     const url = `${this.apiUrl}/ProjectBug/${id}`
     return this.http.delete(url)
  }

  

}
