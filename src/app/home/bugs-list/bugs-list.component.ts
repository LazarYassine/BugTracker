import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import Bug from 'src/app/auth/Models/Bug';
import { BugsService } from 'src/app/auth/Services/bugs.service';
import { ManageBugsComponent } from '../manage-bugs/manage-bugs.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.css'],
  providers: [DialogService, DynamicDialogConfig]
})
export class BugsListComponent {
  p: any
  searchText: ''
  showModel: boolean = false

  listBugs: any;
  myBug: any

  constructor(private bugsService: BugsService, private dialogService: DialogService) {} 

  ngOnInit(){
    this.getBugs()
  }

  getBugs() {
    this.bugsService.getBugsByUser( parseInt(localStorage.getItem("currentUserID"))).subscribe(
      (data)=>{ 
            console.log(data)
            this.listBugs = data
          }
    )
  }


  SeeMore(bug: any) {
    this.myBug = bug
    const ref: DynamicDialogRef = this.dialogService.open(ManageBugsComponent, {
      header: 'My Dialog',
      width: '90%',
      data: this.myBug,
    });

    
  }

}





