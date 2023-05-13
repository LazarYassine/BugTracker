import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/Services/auth-guard.service';
import { BugsListComponent } from './home/bugs-list/bugs-list.component';
import { HomeComponent } from './home/home.component';
import { ManageBugsComponent } from './home/manage-bugs/manage-bugs.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { ManageTeamComponent } from './home/manage-team/manage-team.component';
import { ManageCtegoriesComponent } from './home/manage-ctegories/manage-ctegories.component';

// const routes: Routes = [
//   { path: 'home', component: HomeComponent,
//   children: [
//     { path: 'BugsList', component: BugsListComponent },
//   { path: 'ManageBugs', component: ManageBugsComponent },
//   ]
// },
  
//   { 
//     path: 'auth', loadChildren: 
//        () => import('./auth/auth.module').then((m) => m.AuthModule) 
//   }
// ];

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'Home', 
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate:[AuthGuardService],
    children: [
        {
          path: 'Home',
          component: BugsListComponent
        },
        {
           path: 'BugsList',
           component: BugsListComponent
        },
        {
           path: 'ManageBugs',
           component: ManageBugsComponent
        },
        {
          path: 'ManageTeam',
          component: ManageTeamComponent
        },
        {
          path: 'ManageCategories',
          component: ManageCtegoriesComponent
        }
    ]
  },
  
  { 
    path: 'auth', loadChildren: 
       () => import('./auth/auth.module').then((m) => m.AuthModule) 
  },
  {
    path: '**', pathMatch:"full", component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
