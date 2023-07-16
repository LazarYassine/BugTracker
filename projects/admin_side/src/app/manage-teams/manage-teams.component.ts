import { Component, ViewEncapsulation } from '@angular/core';
import { RolesService } from '../Services/roles.service';
import Roles from '../Models/Roles';
import { ConfirmationService, Header, MessageService } from 'primeng/api';
import { TeamsService } from '../Services/teams.service';
import { AuthService } from '../Services/auth.service';
import { TeamListResult } from '../Models/TeamListResult';
import UserInfo from '../Models/UserInfo';
import Team from '../Models/Team';
import { UserTeamService } from '../Services/user-team.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.css'],
  providers: [ConfirmationService, MessageService],
  encapsulation: ViewEncapsulation.None
})
export class ManageTeamsComponent {
  ManageTeamUsersDialog = false
  ManageDialogHeader: string;
  rolesDialog: boolean;
  roles: any[];
  teams: any[];
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

  myTeam: TeamListResult = {
    team_id: '',
    team_name: '',
    team_lead_id: '',
    team_lead_name: '',
    created_at: new Date()
  }

  role_name = ''
  
  selectedRoles: any[]

  selectedUser: UserInfo = {
    UserId: '',
    DisplayName: '',
    UserName: '',
    Email: '',
    Password: '',
    CreatedDate: new Date(),
    Role_Id: ''
  };
  

  submitted: boolean;
  statuses: any[];

  AllUsers: any[];

  filterValueUser = '';
  filteredUsers: { UserId: string, DisplayName: string, UserName: string, Email: string,Password: string, RoleName: string, RoleId: number  }[] = [];

  User_Teams: any[];
  User_Team: any;

  constructor( private user_teamService: UserTeamService, private teamsSearvice: TeamsService, private usersService: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService ){}


  ngOnInit(){
    this.getAllTeams();
    this.getAllUsers();
  }

  filterUsers(event) {
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < this.AllUsers.length; i++) {
        let user = this.AllUsers[i];
        if (user.displayName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          let newUser: UserInfo = {
            UserId: '',
            DisplayName: '',
            UserName: '',
            Email: '',
            Password: '',
            CreatedDate: new Date(),
            Role_Id: ''
          }  
          newUser.UserId = user.userId
          newUser.DisplayName = user.displayName
          newUser.UserName = user.userName
          newUser.Email = user.email
          newUser.Password = user.password
          newUser.CreatedDate = user.created_at
          newUser.Role_Id = user.role_id
          

          filtered.push(newUser);
        }
    }

    this.filteredUsers = filtered;
    console.log(filtered)
}





  getAllTeams(){
    this.teamsSearvice.getAllTeams().subscribe( (data)=>{
      this.teams = data;
      console.log(data)
    } )
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
    this.role = {
      role_id: 0,
      role_name: ''
    };
    this.submitted = false;
    this.rolesDialog = true;
    this.ManageDialogHeader = "Ajouter un équipe"
  }


  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.roles = this.roles.filter((val) => !this.selectedRoles.includes(val));
            this.selectedRoles = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        }
    });
    }

    editProduct(role: any) {
      // this.roles = { ...role };
      this.rolesDialog = true;
      this.ManageDialogHeader = "Modifier un équipe"
      this.myRole.role_id = role.role_id
      console.log(this.myRole.role_id)
      this.myRole.role_name = role.role_name
      alert(this.myRole.role_name)
      
  }



  


//   deleteProduct(role: any) {
//     this.confirmationService.confirm({
//         message: "Êtes-vous sûr(e) de vouloir supprimer le rôle '" + role.role_name + "' ?",
//         header: 'Confirm',
//         icon: 'pi pi-exclamation-triangle',
//         accept: () => {
//             //this.sd
//             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//         }
//     });
// }


hideDialog() {
  this.rolesDialog = false;
  this.submitted = false;
  this.myRole.role_id = 0
  this.myRole.role_name = ''
}

// saveProduct() {
//   this.submitted = true;

//   if (this.role.role_name.trim()) {
//       if (this.role.role_id) {
//           this.roles[this.findIndexById(this.role.role_id)] = this.role;
//           this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
//       } else {
//           this.role.role_id = this.createId();
//           //this.product.image = 'product-placeholder.svg';
//           this.roles.push(this.role);
//           this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
//       }

//       this.roles = [...this.roles];
//       this.rolesDialog = false;
//       this.role = {};
//   }
// }

DeleteMembre(user_team: any){
  this.confirmationService.confirm({
             message: "Êtes-vous sûr(e) de vouloir supprimer le membre '" + user_team.user_name + "' ?",
             header: 'Confirm',
             icon: 'pi pi-exclamation-triangle',
             accept: () => {
              this.user_teamService.DeleteUser_Team(user_team.team_id, user_team.user_id).subscribe(
                () => {
                  this.GetUser_TeamListsByTeam(user_team.team_id);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Member Deleted', life: 3000 });
                },
                (error) => {
                  // Handle error here
                  console.error('Error deleting member:', error);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete member', life: 3000 });
                }
              );
              
                 
             }
    });
}

SaveTeam(){
  //console.log(this.myRole.role_name);
  
  console.log(this.selectedUser)

  this.team.team_id = 0
  this.team.team_name = this.myTeam.team_name
  this.team.team_lead_id = this.selectedUser.UserId
  this.team.created_at = new Date()


  if ( this.ManageDialogHeader == "Ajouter un équipe" ){
     this.teamsSearvice.addTeam(this.team).subscribe(
       () => this.getAllTeams()
     )
  }else{
    this.team.team_id = this.myTeam.team_id
    this.team.team_name = this.myTeam.team_name
    this.team.team_lead_id = this.selectedUser.UserId
  
    this.teamsSearvice.editTeam(this.team.team_id, this.team).subscribe(
       () => {
         this.getAllTeams()
       }
     )
  }

  this.hideDialog()

}

editTeam(team: any){
  console.log(team)
  this.rolesDialog = true;
  this.ManageDialogHeader = "Modifier un équipe"
  this.myTeam.team_id = team.team_id
  console.log(this.myTeam.team_id)
  this.myTeam.team_name = team.team_name
  //alert(role.team_name)
  this.selectedUser.UserId = team.team_lead_id;
  this.selectedUser.DisplayName = team.team_lead_name;
  // console.log(role.team_lead_id)
  // console.log(role.team_lead_name)
  // console.log(this.selectedUser.UserId)
  // console.log(this.selectedUser.DisplayName)
  // console.log(this.selectedUser)
}

deleteTeam( team: any ) {
  console.log(team)

  this.confirmationService.confirm({
    message: "Êtes-vous sûr(e) de vouloir supprimer l'équipe '" + team.team_name + "' ?",
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // this.teamsSearvice.deleteTeam(team.team_id).subscribe(
      //   () => this.getRolles()
      // )
    
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Team Deleted', life: 3000 });
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

filterValue = '';
  filteredRoles: { role_id: number, role_name: string }[] = [];

  filterRoles(): void {
    // this.filteredRoles = this.roles?.filter(role => role.role_name.toLowerCase().includes(this.filterValue.toLowerCase()));
    // if ( this.filteredRoles.length == 0 ) {
    //   this.filteredRoles = this.roles?.filter(role => role.role_id.toString().includes(this.filterValue));
    // }
    this.filteredRoles = this.roles?.filter(role => role.role_name.toLowerCase().includes(this.filterValue.toLowerCase()) || role.role_id.toString().includes(this.filterValue));

  }

  ManageTeamUsers(team: any){
    //alert(team.team_name)
    this.User_Team = team
    this.ManageTeamUsersDialog = true
    this.GetUser_TeamListsByTeam(team.team_id);
  }

  GetUser_TeamListsByTeam(id: any){
    this.user_teamService.GetUser_TeamListsByTeam(id).subscribe(
      (data) => {
        console.log("-----------")
        console.log(data);
        this.User_Teams = data
        console.log("-----------")
      }
    )
  }


  SaveUserTeam(){

    var user_team =  {
      'user_id': '',
      'team_id': ''
    }

    console.log('--------------')

      console.log(this.selectedUser)
      console.log(this.User_Team)

    console.log('--------------')

    this.user_teamService.CheckUserTeamExist(this.User_Team.team_id, this.selectedUser.UserId).subscribe(
      (result) => {
        
        if( result == false ) {
          //alert('Not !')
          user_team.user_id = this.selectedUser.UserId
          user_team.team_id = this.User_Team.team_id
          this.user_teamService.AddUser_Team(user_team).subscribe(
            () => {
              this.GetUser_TeamListsByTeam(user_team.team_id);
            }
          )
        }
        else{
          alert('Existe déja !')
        }

      }
    )

  }



}
