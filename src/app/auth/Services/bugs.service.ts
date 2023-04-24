import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Bug from '../Models/Bug';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  apiUrl = "https://localhost:44320/api"

  constructor(private http: HttpClient) { }

  getBugs() {
    return this.http.get<Bug[]>(this.apiUrl + '/Bugs')
  }

  addBug(bug: Bug) {
    return this.http.post(this.apiUrl + '/Bugs', bug)
  }

  editBug(id: number, bug: Bug): Observable<Bug> {
    const url = `${this.apiUrl}/bugs/${id}`;
    return this.http.put<Bug>(url, bug);
  }


  deleteBug(id: number) {
    const url = `${this.apiUrl}/Bugs/${id}`
    return this.http.delete(url)
  }


}
