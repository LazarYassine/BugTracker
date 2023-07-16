import { Component } from '@angular/core';
import UserInfo from '../Models/UserInfo';
import { RolesService } from '../Services/roles.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../Services/auth.service';
import Roles from '../Models/Roles';
import { UserWithRoleDto } from '../Models/UserWithRoleDto';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ManageUsersComponent {

    ManageDialogHeader: string;
    userDialog: boolean;
    users: any[];
    user: any;
    myUser : UserInfo = {
      UserId: 0,
      DisplayName: '',
      UserName: '',
      Email: '',
      Password: '',
      CreatedDate: new Date(),
      Role_Id: 0
    }

    selectedRole: Roles = {
      role_id: 0,
      role_name: ''
    }
  
    role_name = ''
    roles: any[];
    //selectedRole: any;
  
    submitted: boolean;
    statuses: any[];

    filterValue = '';
    filteredUsers: { userId: string, displayName: string, userName: string, email: string,password: string, roleName: string, roleId: number  }[] = [];
    filteredRoles: any[]

    userWithRoleDto: UserWithRoleDto = {
      UserId: 0,
      DisplayName: '',
      UserName: '',
      Email: '',
      Password: '',
      CreatedDate: new Date(),
      RoleId: 0,
      RoleName: '',
    };

    constructor( private rolesService: RolesService, private authService: AuthService){}
  
  
    ngOnInit(){
      this.GetAllUserWithRole();
      this.getRoles();
    }
  
    getRoles(){
      this.rolesService.getAllRoles().subscribe(
        (data) => {
          this.roles = data;
        }
      )
    }

    filterRoles(event) {
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < this.roles.length; i++) {
          let role = this.roles[i];
          if (role.role_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(role);
          }
      }

      this.filteredRoles = filtered;
  }

    openNew() {
      // this.role = {
      //   role_id: 0,
      //   role_name: ''
      // };
      this.submitted = false;
      this.userDialog = true;
      this.ManageDialogHeader = "Ajouter un role"
    }
  
  
    deleteSelectedProducts() {
      // this.confirmationService.confirm({
      //     message: 'Are you sure you want to delete the selected products?',
      //     header: 'Confirm',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //         this.roles = this.roles.filter((val) => !this.selectedRoles.includes(val));
      //         this.selectedRoles = null;
      //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      //     }
      // });
      // }
  
      // editProduct(user: any) {
      //   // this.roles = { ...role };
      //   this.rolesDialog = true;
      //   this.ManageDialogHeader = "Modifier un role"
      //   this.myUser.UserId = user.UserId
      //   this.myUser.UserName = user.UserName
    }
  
  
  
    async GetAllUserWithRole(){
      //  await this.rolesService.getAllRoles().subscribe(
      //   (data) => {
      //     this.roles = data;
      //     console.log(this.roles);
      //     this.filterRoles()
      //   }
      // )

      await this.authService.GetAllUserWithRole().subscribe(
        (data)=> {
          this.users = data
          console.log(this.users)
          this.filterUsers()
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
    this.userDialog = false;
    this.submitted = false;
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
  
  SaveRole(){
    // console.log(this.myRole.role_name);
   
     if ( this.ManageDialogHeader == "Ajouter un role" ){
      //  this.rolesService.addRole(this.mle).subscribe(
      //    () => { 
      //           this.getRoles();
      //           this.GetAllUserWithRole(); 
      //         }
      //  )
     }else{
        this.userWithRoleDto.RoleId = this.selectedRole.role_id
        this.authService.EditUserRole(this.userWithRoleDto).subscribe(
          () => {
            this.getRoles();
            this.GetAllUserWithRole();
          }
        )
     }
    console.log(this.selectedRole)
    this.hideDialog()
  
  }
  
  editRole(user: any){
    console.log(user)
    this.userDialog = true;
    this.ManageDialogHeader = "Modifier le role"
    this.selectedRole.role_id = user.roleId
    this.selectedRole.role_name = user.roleName
    this.userWithRoleDto.UserId = user.userId
  }
  
  deleteRole( role: any ) {
    console.log(role)
  
  //   this.confirmationService.confirm({
  //     message: "Êtes-vous sûr(e) de vouloir supprimer le rôle '" + role.role_name + "' ?",
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.rolesService.deleteRole(role.role_id).subscribe(
  //         () => this.getRolles()
  //       )
      
  //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
  //     }
  // });
  
  }
  
 
  
  
  
  afficher(dt: any) {
    console.log(dt.value)
  }
  
  
  
  filterUsers(): void {

      this.filteredUsers = this.users;
      console.log(this.filterUsers)
      //  this.filteredRoles = this.roles?.filter(role => role.role_name.toLowerCase().includes(this.filterValue.toLowerCase()));
      //  if ( this.filteredRoles.length == 0 ) {
      //    this.filteredRoles = this.roles?.filter(role => role.role_id.toString().includes(this.filterValue));
      //  }
      this.filteredUsers = this.users?.filter(user => user.userId.toString().includes(this.filterValue.toString()) || user.roleName.toString().toLowerCase().includes(this.filterValue.toLowerCase())
      || user.displayName.toLowerCase().includes(this.filterValue.toLowerCase()) );
  
    }
  
  }
  