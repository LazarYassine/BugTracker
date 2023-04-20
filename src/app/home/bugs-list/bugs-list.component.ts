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
  showModel: boolean = false
  errors: any[];
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  listBugs: any[];
  cols: any[];
  myBug: any

  constructor(private bugsService: BugsService, private dialogService: DialogService) {} 

  ngOnInit(){
    this.getBugs()
    this.cols = [
      { field: 'ID', header: 'Id' },
      { field: 'Title', header: 'Title' },
      { field: 'BugDesc', header: 'Description' }
  ];
  }

  getBugs() {
    this.bugsService.getBugs().subscribe(
      (data)=>{ 
            console.log(data)
            this.listBugs = data
          }
    )
  }


  SeeMore(bug: any) {
    //this.showModel = true
    this.myBug = bug
    console.log(this.myBug)
    const ref: DynamicDialogRef = this.dialogService.open(ManageBugsComponent, {
      header: 'My Dialog',
      width: '70%',
      data: this.myBug, // Pass the data to the dialog using the "data" property
    });
  }

}
function OnInit() {
  throw new Error('Function not implemented.');
}




