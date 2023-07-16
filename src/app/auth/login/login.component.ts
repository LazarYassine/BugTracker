import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserInfo from '../Models/UserInfo';
import { AuthService } from '../Services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';


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
    console.log("Start at => " + new Date() )

   
    document.getElementById("loader").style.visibility = "visible";
    


    this.authService.login(this.User).subscribe(
      token => {
        localStorage.setItem("auth_token", token);
            
        this.authService.CurrentUser(this.User.Email, this.User.Password).subscribe(
          (data)=>{
            
            localStorage.setItem("username", data["displayName"])
            if( localStorage.getItem("auth_token") != "" || localStorage.getItem("auth_token") != undefined ){
              localStorage.setItem("currentUserID", data["userId"].toString() )
              this.router.navigateByUrl("Home/BugsList");
            }
            localStorage.setItem("role", data["roleName"])
          }
        )
  
        
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials',
          text: 'Please check your email and password and try again.',
        });        
        console.log("Error:", error.error);
        console.log("Status:", error.status);
        // Handle the error or status code here
      }
    )
    document.getElementById("loader").style.visibility = "hidden"
    console.log("End at => " + new Date() )
  }


}

