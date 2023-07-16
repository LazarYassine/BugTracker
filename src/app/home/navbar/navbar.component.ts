import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
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
  isAdmin: boolean
  isTesteur: boolean
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
      label: 'Manage project bugs',
      icon: 'pi pi-fw pi-map',
      routerLink: 'ManageProjectBugs'
    },
    { 
       label: 'Manage My Teams',
       icon: 'pi pi-code',
       routerLink: 'ManageTeam'
     },
    // {
    //   label: 'Manage Categories',
    //   icon: 'pi pi-sitemap',
    //   routerLink: 'ManageCategories'
    // },
    // {
    //   label: 'Manage Projects',
    //   icon: 'pi pi-align-justify',
    //   routerLink: 'ManageProjects'
    // }
];




constructor( private route: Router, private dialogService: DialogService ) {

}

ngOnInit(): void {
  this.CurrentUserName = localStorage.getItem("username")
  if( localStorage.getItem('role').toLowerCase() == 'admin' ){
    this.isAdmin = true
  }else {
    this.isAdmin = false
  }

  

}


ShowUserProfileSettingsDialog() {
    this.dialogService.open(ManageUserProfileComponent, {
      header: "User Profile Settings",
      width: "90%",
      height: "90%",
      baseZIndex: 9999
    })
}

goToAdminSide(){
  const decodedToken =  jwtDecode(localStorage.getItem("auth_token"));
  
  const expirationTime = decodedToken["exp"] * 1000;  // Convert to milliseconds

  let param1 = expirationTime
  let param2 = localStorage.getItem("role")
  var url = 'http://localhost:4200/admin_side?auth=' + encodeURIComponent(param1) + '&role=' + encodeURIComponent(param2);
  window.location.href = url;
  
  //alert(url)
}

logout() {
  this.route.navigateByUrl('auth/login')
  localStorage.removeItem("auth_token")
  localStorage.removeItem("username")
  localStorage.removeItem("currentUserID")
  localStorage.removeItem("role")
}





}
