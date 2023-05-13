import { Component } from '@angular/core';
import UserInfo from 'src/app/auth/Models/UserInfo';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent {

  

  items: number[];
  chosenUser: UserInfo[] = [];

  constructor() {}

  ngOnInit(){
    this.fillData()
  }

  fillData(){
    this.items = []
    for (let i = 0; i < 20; i++) {
      const randomNum = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
      this.items.push(randomNum);
    }

    console.log(this.items);
  }

  chooseUser(e: any) {
      console.log(e.target.checked)
      console.log(e)
      //document.getElementById("user_974").style.border = "5px #22c55e solid"
  }

}
