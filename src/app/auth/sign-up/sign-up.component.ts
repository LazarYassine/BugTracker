import { Component } from '@angular/core';
import UserInfo from '../Models/UserInfo';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  User: UserInfo = {
    UserId: 2,
    DisplayName: '',
    UserName: '',
    Email: '',
    Password: '',
    CreatedDate: new Date()
  }

  constructor(private authServie: AuthService) {}


  register() {
    console.log(this.User)
    this.authServie.register(this.User).subscribe()
  }


}
