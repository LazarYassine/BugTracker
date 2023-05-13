import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog'
import { config } from 'rxjs';
import { ManageUserProfileComponent } from 'src/app/auth/manage-user-profile/manage-user-profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DialogService],
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
    },
    { 
      label: 'Manage My Teams',
      icon: 'pi pi-code',
      routerLink: 'ManageTeam'
    },
    {
      label: 'Manage Categories',
      icon: 'pi pi-sitemap',
      routerLink: 'ManageCategories'
    }
];




constructor( private route: Router, private dialogService: DialogService ) {

}

ngOnInit(): void {
  this.CurrentUserName = localStorage.getItem("username")
}


ShowUserProfileSettingsDialog() {
    this.dialogService.open(ManageUserProfileComponent, {
      header: "User Profile Settings",
      width: "90%",
      height: "90%",
      baseZIndex: 9999
    })
}


logout() {
  this.route.navigateByUrl('auth/login')
  localStorage.removeItem("auth_token")
}





}
