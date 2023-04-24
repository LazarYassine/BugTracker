import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserInfo from '../Models/UserInfo';
import { AuthService } from '../Services/auth.service';
import { environment } from 'src/environments/environment';


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
    console.log(this.User);
  
    this.authService.login(this.User).subscribe(
      token => {
        //console.log(token);
        localStorage.setItem("auth_token", token);
            
        this.authService.CurrentUser(this.User.Email, this.User.Password).subscribe(
          (data)=>{
            // console.log(data)
            // console.log(data.UserId)
            // console.log(data["userId"])
            localStorage.setItem("currentUser", data["userId"].toString() )
            environment.currentUser = data
            localStorage.setItem("username", data["displayName"])
            console.log(environment.currentUser)
          }
        )
  
        this.router.navigateByUrl("Home/BugsList");
      },
      error => {
        console.log("Error:", error);
        console.log("Status:", error.status);
        // Handle the error or status code here
      }
    )
  }


}

