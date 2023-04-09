import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {



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




constructor( private route: Router ) {

}

ngOnInit(): void {

}


logout() {
  this.route.navigateByUrl('auth/login')
}





}
