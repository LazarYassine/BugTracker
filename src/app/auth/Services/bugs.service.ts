import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Bug from '../Models/Bug';

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  host = "https://localhost:44320/api"

  constructor(private http: HttpClient) { }

  getBugs() {
    return this.http.get<Bug[]>(this.host + '/Bugs')
  }

  addBug(bug: Bug) {
    return this.http.post(this.host + '/Bugs', bug)
  }

}
