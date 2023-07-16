import { Component, ViewEncapsulation } from '@angular/core';
import UserInfo from '../Models/UserInfo';
import { TeamListResult } from '../Models/TeamListResult';
import Roles from '../Models/Roles';
import Team from '../Models/Team';
import { RolesService } from '../Services/roles.service';
import { TeamsService } from '../Services/teams.service';
import { AuthService } from '../Services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from '../Services/project.service';
import Project from '../Models/Project';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ManageProjectsComponent {

  ManageDialogHeader: string;
  projectDialog: boolean;
  roles: any[];
  teams: any[];
  projects: any[];
  filteredProjects: any[];
  role: any;
  myRole : Roles = {
    role_id: 0,
    role_name: ''
  }
  team: Team = {
    team_id: 0,
    team_name: '',
    team_lead_id: '',
    created_at: new Date()
  }

  myProject: Project = {
    project_id: 0,
    project_name: '',
    team_id: 0,
    start_date: new Date(),
    end_date: new Date(),
    created_at: new Date()
  }

  searchedTeam: any;

  myTeam: TeamListResult = {
    team_id: '',
    team_name: '',
    team_lead_id: '',
    team_lead_name: '',
    created_at: new Date()
  }

  role_name = ''
  
  selectedRoles: any[]
  selectedTeam: Team = {
    team_id: 0,
    team_name: "",
    team_lead_id: '',
    created_at: new Date()
  };
  selectedUser: UserInfo = {
    UserId: '',
    DisplayName: '',
    UserName: '',
    Email: '',
    Password: '',
    CreatedDate: new Date(),
    Role_Id: ''
  };
  
  filterValue = '';
  filteredRoles: { role_id: number, role_name: string }[] = [];

  submitted: boolean;
  statuses: any[];

  AllUsers: any[];

  filterValueUser = '';
  filteredUsers: { UserId: string, DisplayName: string, UserName: string, Email: string,Password: string, RoleName: string, RoleId: number  }[] = [];
  filteredTeams: Team[] = [];
  AllTeams: Team[]=[]
  
  constructor( private projectService: ProjectService, private rolesService: RolesService, private teamsSearvice: TeamsService, private usersService: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService ){}

  ngOnInit(){
    this.getRolles();
    this.getAllTeams();
    this.getAllUsers();
    this.getAllProjects();
  }

  getAllProjects(){
    this.projectService.getAllProjects().subscribe(
      (data) => {
        console.log("projects")
        console.log(data)
        this.projects = data
        this.filterProjects()
      }
    )
  }

  getAllUsers(){
    this.usersService.GetAllUserWithRole().subscribe(
      (data) => {
        this.AllUsers = data;
        console.log(this.AllUsers)
      }
    )
  }
  openNew() {
    // this.role = {
    //   role_id: 0,
    //   role_name: ''
    // };
    this.submitted = false;
    this.projectDialog = true;
    this.ManageDialogHeader = "Ajouter un Projet"
  }

  hideDialog() {
    this.projectDialog = false;
    this.submitted = false;
    // this.selectedTeam.team_id = 0
    // this.selectedTeam.team_name = ''
    this.myProject.project_name = ''
    this.myProject.start_date = new Date()
    this.myProject.end_date = new Date();
  }

  filterProjects(): void {
    //  this.projects = this.projects?.filter(project => project.project_name.toLowerCase().includes(this.filterValue.toLowerCase()));
    //  if ( this.projects.length == 0 ) {
    //    this.projects = this.projects?.filter(project => project.project_id.toString().includes(this.filterValue));
    //  }
    
    this.filteredProjects = this.projects?.filter(project => project.project_name.toLowerCase().includes(this.filterValue.toLowerCase()) || project.project_id.toString().includes(this.filterValue));

  }


  SaveProject(){
    //console.log(this.myRole.role_name);
    
    console.log(this.selectedTeam)
  
    //this.myProject.
    this.myProject.team_id = this.selectedTeam.team_id

    console.log(this.myProject)
  
  
    if ( this.ManageDialogHeader == "Ajouter un Projet" ){
       this.projectService.addProject(this.myProject).subscribe(
         () => this.getAllProjects()
       )
    }else{
     
      this.myProject.team_id = this.selectedTeam.team_id
      this.projectService.editProject(this.myProject.project_id, this.myProject).subscribe(
        () => this.getAllProjects()
      )

    }


  
    this.hideDialog()
  
  }
  
  editProject(project: any){
    this.searchedTeam = null
    // this.selectedTeam.team_id = 0
    // this.selectedTeam.team_name = ''
    this.selectedTeam = {
      team_id: 0,
      team_name: "",
      team_lead_id: '',
      created_at: new Date()
    };
    this.myProject.project_name = ''
    this.myProject.start_date = new Date()
    this.myProject.end_date = new Date();
    console.log(project)
    this.projectDialog = true;
    this.ManageDialogHeader = "Modifier un Projet"
    // console.log(role.team_lead_id)
    // console.log(role.team_lead_name)
    // console.log(this.selectedUser.UserId)
    // console.log(this.selectedUser.DisplayName)
    // console.log(this.selectedUser)
    this.myProject.project_id = project.project_id
    this.myProject.project_name = project.project_name
    this.myProject.start_date = new Date(project.start_date)
    this.myProject.end_date = new Date(project.end_date)
    console.table( this.teams )
    console.log(project.team_id)
    this.searchedTeam = this.teams.filter(team => team.team_id == project.team_id)
    //this.selectedTeam.team_name =
    if( this.searchedTeam != null){
      if( this.searchedTeam[0].team_id != null  ){
        this.selectedTeam.team_id = this.searchedTeam[0].team_id
       this.selectedTeam.team_name = this.searchedTeam[0].team_name
      }
      
    }



  }
  
  deleteProject( project: any ) {
    console.log(project)
  
    this.confirmationService.confirm({
      message: "Êtes-vous sûr(e) de vouloir supprimer le Projet '" + project.project_name + "' ?",
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.deleteProject(project.project_id).subscribe(
          () => this.getAllProjects()
        )
      
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
      }
  });
  
  }
  
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].role_id === id) {
            index = i;
            break;
        }
    }
  
    return index;
  }
  
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  
  
  
  afficher(dt: any) {
    console.log(dt.value)
  }
  
  getAllTeams(){
    this.teamsSearvice.getAllTeams().subscribe( (data)=>{
      this.teams = data;
      console.log(data)
    } )
  }
  
  async getRolles(){
    await this.rolesService.getAllRoles().subscribe(
     (data) => {
       this.roles = data;
       console.log(this.roles);
       //this.filterProjects()
     }
   )
 }

 filterTeams(event) {
  let filtered: any[] = [];
  let query = event.query;
  
  for (let i = 0; i < this.teams.length; i++) {
      let team = this.teams[i];
      if (team.team_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        
        

        filtered.push(team);
      }
  }

  this.filteredTeams = filtered;
  console.log(this.filteredTeams)
}


}
