import { Component } from '@angular/core';
import { ConfirmationService, Header, MessageService } from 'primeng/api';
import Roles from 'projects/admin_side/src/app/Models/Roles';
import { RolesService } from 'projects/admin_side/src/app/Services/roles.service';
import { ProjectBug } from 'src/app/auth/Models/ProjectBug';
import { ProjectBugsServiceService } from 'src/app/auth/Services/project-bugs-service.service';
import { ProjectService } from 'src/app/auth/Services/project.service';

@Component({
  selector: 'app-manage-project-bugs',
  templateUrl: './manage-project-bugs.component.html',
  styleUrls: ['./manage-project-bugs.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ManageProjectBugsComponent {
  isTesteur: boolean
  filteredProjects: any[];
  projects: any[];

  Status : any[]
    
  selectedStatus: any;

  Priorities : any[]
    

  selectedPriority: any = {
    id :'',
    title: ''
  };

  selectedProject: any = {
    project_id: '',
    project_name: ''
  };
  ManageDialogHeader: string;
  projectBugDialog: boolean;
  roles: any[];
  role: any;
  myRole : Roles = {
    role_id: 0,
    role_name: ''
  }

  myProjectBug: ProjectBug = {
      BugID : 0,
      BugDesc : '',
      status : 1,
      priority : '',
      ProjectId : 0,
      created_at : new Date()
    
  }

  role_name = ''
  
  selectedRoles: any[]

  submitted: boolean;
  statuses: any[];

  projectBugs: any[];
  
  projectBugsWithProjectInfo: any[];

  constructor( private projectsService: ProjectService, private rolesService: RolesService, private projectBugsService: ProjectBugsServiceService, private messageService: MessageService, private confirmationService: ConfirmationService ){}


  async ngOnInit(){
    this.getAllProjectBugsWithProjectInfo()
    await this.getRolles();
    this.getAllProjectBugs();
    this.getAllProjects();
    this.Priorities = [
      {
        'id': 1,
        'title': 'Height'
      },
      {
        'id': 2,
        'title': 'Medium'
      },
      {
        'id': 3,
        'title': 'Low'
      }
    ]


    this.Status = [
      {
        'id': 0,
        'title': 'En Cours'
      },
      {
        'id': 1,
        'title': 'Traité'
      }
    ]
  

    if ( localStorage.getItem("role").toLowerCase() =='Testeur' ) {
      this.isTesteur = true
    }else{
      this.isTesteur = false
    }



  }


  getAllProjectBugsWithProjectInfo(){
    this.projectBugsService.getBugWithProjectInfo().subscribe(
      (data) => {
        this.projectBugsWithProjectInfo = data;
        console.log(this.projectBugsWithProjectInfo)
      }
    )
  }


  getAllProjectBugs(){
    this.projectBugsService.getProjectBugs().subscribe(
      (data) => {
        this.projectBugs = data;
        console.log(" project Bugs " + this.projectBugs)
      }
    )
  }

  getAllProjects(){
    this.projectsService.getAllProjects().subscribe(
      (data) => {
        this.projects = data
        console.log(this.projects);
        console.log(this.Status)
      }
    )
  }

  openNew() {
    // this.role = {
    //   role_id: 0,
    //   role_name: ''
    // };
    this.submitted = false;
    this.projectBugDialog = true;
    this.ManageDialogHeader = "Ajouter un bug"
    this.myProjectBug.BugID = 0
    this.myProjectBug.BugDesc = '';
    this.selectedStatus = 0
    this.selectedProject.project_id = ''
    this.selectedProject.project_name = ''
    this.selectedPriority = '' 
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
      this.projectBugDialog = true;
      this.ManageDialogHeader = "Modifier un bug"
      this.myRole.role_id = role.role_id
      this.myRole.role_name = role.role_name
  }

  filterPriorities(event: Event){
    this.Priorities = [
      {
        'id': 1,
        'title': 'high'
      },
      {
        'id': 2,
        'title': 'Medium'
      },
      {
        'id': 3,
        'title': 'Low'
      }
    ]


   
  }

  filterStatus(event: Event){
    this.Status = [
      {
        'id': 0,
        'title': 'En Cours'
      },
      {
        'id': 1,
        'title': 'Traité'
      }
    ]
  }

  async getRolles(){
     await this.rolesService.getAllRoles().subscribe(
      (data) => {
        this.roles = data;
        console.log(this.roles);
        this.filterRoles()
      }
    )
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
  this.projectBugDialog = false;
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
//       this.projectBugDialog = false;
//       this.role = {};
//   }
// }


filterProjects(event) {
  let filtered: any[] = [];
  let query = event.query;
  
  for (let i = 0; i < this.projects.length; i++) {
      let project = this.projects[i];
      if (project.project_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        
        

        filtered.push(project);
      }
  }

  this.filteredProjects = filtered;
  console.log(this.filteredProjects)

}


SaveProjectBug(){
  //console.log(this.myRole.role_name);
  
  if ( this.ManageDialogHeader == "Ajouter un bug" ){
    // this.rolesService.addRole(this.myRole).subscribe(
    //   () => this.getRolles()
    // )

    this.myProjectBug.ProjectId = this.selectedProject.project_id
    this.myProjectBug.priority = this.selectedPriority.title
    this.myProjectBug.status = this.selectedStatus.id

    this.projectBugsService.addProjectBug(this.myProjectBug).subscribe(
      () => {
        this.getAllProjectBugsWithProjectInfo();
      }
    )

  }else{
    this.myProjectBug.ProjectId = this.selectedProject.project_id
    this.myProjectBug.priority = this.selectedPriority.title
    this.myProjectBug.status = this.selectedStatus.id
    this.projectBugsService.editProjectBug(this.myProjectBug.BugID, this.myProjectBug).subscribe(
      () => {
        this.getAllProjectBugsWithProjectInfo()
      }
    )
  }

  this.hideDialog()

}

editProjectbug(projectBug: any){
  console.log(projectBug)
  this.projectBugDialog = true;
  this.ManageDialogHeader = "Modifier un bug";
  this.myProjectBug.BugID = projectBug.bugID
  this.myProjectBug.BugDesc = projectBug.bugDesc;
  this.selectedStatus = this.Status.filter( sts => sts.id == projectBug.status )[0]
  this.selectedProject.project_id = projectBug.projectId
  this.selectedProject.project_name = projectBug.projectName
  this.selectedPriority = this.Priorities.filter( priority => priority.title.toLowerCase() == projectBug.priority.toLowerCase() )[0]
  console.log("--------")
    // console.log(this.Status.filter( sts => sts.id == projectBug.status )[0])
    // console.log(this.Priorities.filter( priority => priority.title == projectBug.priority )[0])
  console.log("--------")
  //console.log(this.selectedStatus)
}

deleteProjectbug( projectBug: any ) {
  console.log(projectBug)

  this.confirmationService.confirm({
    message: "Êtes-vous sûr(e) de vouloir supprimer le bug '" + projectBug.bugDesc + "' ?",
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.projectBugsService.deleteProjectBug(projectBug.bugID).subscribe(
         () => this.getAllProjectBugsWithProjectInfo()
      )
    
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bug Deleted', life: 3000 });
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



}
