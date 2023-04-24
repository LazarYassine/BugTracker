import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {

  CurrentUserName = ''

  items = [
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: 'BugsList'
    },
    { 
        label: 'Manage Bugs',
        icon: 'pi pi-fw pi-cog',
        routerLink: 'ManageBugs'
    }
];




constructor( private route: Router,  ) {

}

ngOnInit(): void {
  this.CurrentUserName = localStorage.getItem("username")
}


logout() {
  this.route.navigateByUrl('auth/login')
  localStorage.removeItem("auth_token")
}





}
