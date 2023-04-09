import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugsListComponent } from './home/bugs-list/bugs-list.component';
import { HomeComponent } from './home/home.component';
import { ManageBugsComponent } from './home/manage-bugs/manage-bugs.component';

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
    children: [
        {
           path: 'BugsList',
           component: BugsListComponent
        },
        {
           path: 'ManageBugs',
           component: ManageBugsComponent
        }
    ]
  },
  
  { 
    path: 'auth', loadChildren: 
       () => import('./auth/auth.module').then((m) => m.AuthModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
