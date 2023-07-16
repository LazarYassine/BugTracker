import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  sidebarVisible: boolean = false;
  show_btn: boolean = true
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  ManageRoles() {
    this.router.navigateByUrl("ManageRoles")
    this.sidebarVisible = false
  }
  
  ManageUsers() {
    this.router.navigateByUrl("ManageUsers")
    this.sidebarVisible = false
  }
  ManageProjects() {
    this.router.navigateByUrl("ManageProjects")
    this.sidebarVisible = false
  }
  ManageTeams() {
    this.router.navigateByUrl("ManageTeams")
    this.sidebarVisible = false
  }

  GoToDashboard() {
    this.router.navigateByUrl("home")
    this.sidebarVisible = false
  }

}
