import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import Project from '../Models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl = "https://localhost:44320/api"

  constructor(private http: HttpClient) { }

  getAllProjects() {
    return this.http.get<any>(this.apiUrl + "/Project")
  }

  addProject(project: Project) {
    return this.http.post(this.apiUrl + '/Project', project)
  }

  editProject(id: number, project: Project): Observable<Project> {
    const url = `${this.apiUrl}/Project/${id}`;
    return this.http.put<Project>(url, project);
  }

  deleteProject(id: number) {
    const url = `${this.apiUrl}/Project/${id}`;
    return this.http.delete(url);

  }

  
}
