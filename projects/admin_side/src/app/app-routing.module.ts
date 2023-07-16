import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { AuthGuardAdminService } from './Services/auth-guard.service';

const routes : Routes = [
  {
    path: 'admin_side', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardAdminService]
  },
  {
    path: 'ManageRoles', component: ManageRolesComponent, canActivate: [AuthGuardAdminService]
  },
  {
    path: 'ManageUsers', component: ManageUsersComponent, canActivate: [AuthGuardAdminService]
  },
  {
    path: 'ManageProjects', component: ManageProjectsComponent, canActivate: [AuthGuardAdminService]
  },
  {
    path: 'ManageTeams', component: ManageTeamsComponent, canActivate: [AuthGuardAdminService]
  },
  {
    path: 'notAllowed', component: NotAllowedComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
