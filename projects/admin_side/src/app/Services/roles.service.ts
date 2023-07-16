import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Roles from '../Models/Roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  apiUrl = "https://localhost:44320/api"

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get<any>(this.apiUrl + "/roles")
  }

  addRole(role: Roles) {
    return this.http.post(this.apiUrl + '/Roles/addRole', role)
  }

  editRole(id: number, role: Roles): Observable<Roles> {
    const url = `${this.apiUrl}/roles/${id}`;
    return this.http.put<Roles>(url, role);
  }

  deleteRole(id: number) {
    const url = `${this.apiUrl}/roles/${id}`;
    return this.http.delete(url);

  }

}