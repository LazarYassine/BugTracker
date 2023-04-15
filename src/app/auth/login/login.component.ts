import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserInfo from '../Models/UserInfo';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  User: UserInfo = {
    UserId: 0,
    DisplayName: '',
    UserName: '',
    Email: '',
    Password: '',
    CreatedDate: new Date()
  }

  constructor(private authService: AuthService,  private router: Router ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.User)

    this.authService.login(this.User).subscribe(
       token => {
          console.log(token);
          localStorage.setItem("auth_token", token);
          
          this.router.navigateByUrl("")
        }
    )

  }

}
