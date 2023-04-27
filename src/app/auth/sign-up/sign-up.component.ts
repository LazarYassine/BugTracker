import { Component } from '@angular/core';
import UserInfo from '../Models/UserInfo';
import { AuthService } from '../Services/auth.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }


  register() {
    //console.log(this.User);
    console.log(this.router.url)
    if ( this.User.UserName == "" && this.User.DisplayName == "" && this.User.Email == "" && this.User.Password == "" ) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill all fields',
        showConfirmButton: true,
      });
    }
    else if ( this.checkEmailFormat(this.User.Email) == false ) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email format',
        text: 'Please enter a valid email address, such as example@domain.com',
      });
      
    } 
    else {

      this.authService.CurrentUser(this.User.Email, this.User.Password).subscribe(
        (data) => {
          if ( data != null ) {
            Swal.fire({
              icon: 'error',
              title: 'Registration failed',
              text: 'This email and password combination is already taken. Please try a different email and password.',
              confirmButtonText: 'Ok'
            });
                    
          }
          else{
            this.createNewUser()
          }
        }
      )

    }

    

  }

  
  createNewUser(){
    this.authService.register(this.User).subscribe(
      (response: HttpResponse<any>) => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Thank you for registering!',
            showConfirmButton: false,
            timer: 3000
          });

        }
      
    );

  }

  checkEmailFormat(email: string): boolean {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z]+(\.[a-zA-Z]{1,3}){1,2}$/;
    return emailRegex.test(email);
  }
  

}
