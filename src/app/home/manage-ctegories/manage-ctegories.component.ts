import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-ctegories',
  templateUrl: './manage-ctegories.component.html',
  styleUrls: ['./manage-ctegories.component.css']
})
export class ManageCtegoriesComponent {

  visibleMC: boolean;
  visibleMT: boolean;


  showDialogAddCategory() {
    this.visibleMC = true;
  }

  showDialogAddTech() {
    this.visibleMT = true
  }


  addCategory(){}
  editCategory(){}
  deleteCategory(){}
  cancelEdit(){}


}
