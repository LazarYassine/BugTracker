import { Component } from '@angular/core';
import { RolesService } from '../Services/roles.service';
import Roles from '../Models/Roles';
import { ConfirmationService, Header, MessageService } from 'primeng/api';
// import Roles from '../Models/Roles';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ManageRolesComponent {
  ManageDialogHeader: string;
  rolesDialog: boolean;
  roles: any[];
  role: any;
  myRole : Roles = {
    role_id: 0,
    role_name: ''
  }

  role_name = ''
  
  selectedRoles: any[]

  submitted: boolean;
  statuses: any[];

  constructor( private rolesService: RolesService, private messageService: MessageService, private confirmationService: ConfirmationService ){}


  async ngOnInit(){
    await this.getRolles();
  }


  openNew() {
    this.role = {
      role_id: 0,
      role_name: ''
    };
    this.submitted = false;
    this.rolesDialog = true;
    this.ManageDialogHeader = "Ajouter un role"
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
      this.ManageDialogHeader = "Modifier un role"
      this.myRole.role_id = role.role_id
      this.myRole.role_name = role.role_name
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

SaveRole(){
  console.log(this.myRole.role_name);
  
  if ( this.ManageDialogHeader == "Ajouter un role" ){
    this.rolesService.addRole(this.myRole).subscribe(
      () => this.getRolles()
    )
  }else{
    this.rolesService.editRole(this.myRole.role_id, this.myRole).subscribe(
      () => {
        this.getRolles()
      }
    )
  }

  this.hideDialog()

}

editRole(role: any){
  console.log(role)
  this.rolesDialog = true;
  this.ManageDialogHeader = "Modifier un role"
  this.myRole.role_id = role.role_id
  this.myRole.role_name = role.role_name
}

deleteRole( role: any ) {
  console.log(role)

  this.confirmationService.confirm({
    message: "Êtes-vous sûr(e) de vouloir supprimer le rôle '" + role.role_name + "' ?",
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.rolesService.deleteRole(role.role_id).subscribe(
        () => this.getRolles()
      )
    
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
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






