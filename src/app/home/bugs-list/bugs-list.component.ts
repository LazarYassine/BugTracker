import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BugsService } from 'src/app/auth/Services/bugs.service';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.css']
})
export class BugsListComponent {

  errors: any[];
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  listBugs: any[];
  cols: any[];

  constructor(private bugsService: BugsService) {} 

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

}
function OnInit() {
  throw new Error('Function not implemented.');
}

