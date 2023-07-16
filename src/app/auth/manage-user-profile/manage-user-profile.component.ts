import { Component, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-manage-user-profile',
  templateUrl: './manage-user-profile.component.html',
  styleUrls: ['./manage-user-profile.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]

})
export class ManageUserProfileComponent {

  CurrentUserName = ''

  UserInfo :any = {
    userId: localStorage.getItem("currentUserID"),
    displayName: "",
    userName: "",
    email: "",
    password: "",
    createdDate: new Date()
  }
  confPassWord =  ''

  token = localStorage.getItem("auth_token")

  constructor(private messageService: MessageService, private authService: AuthService){}

  ngOnInit() {
    this.CurrentUserName = localStorage.getItem("username")
    
    const decodedToken = JSON.parse(atob(this.token.split('.')[1]));

    // Assigning values to UserInfo properties
    this.UserInfo.displayName = decodedToken["DisplayName"];
    this.UserInfo.userName = decodedToken["UserName"];
    this.UserInfo.email = decodedToken["Email"];
    this.UserInfo.password = "";  // You can set it to an empty string or any default value
    this.UserInfo.createdDate = new Date();
  }
  
  Preview(e: Event) {
    let imgFile = (document.getElementById("profileImgUpload") as HTMLInputElement).files[0];
    const reader = new FileReader();
    let extension = imgFile.name.substring(imgFile.name.lastIndexOf(".") + 1).toUpperCase()

    // Read image file and display preview
    reader.onload = (e: any) => {
      const imgFileUrl = e.target.result;
      console.log(imgFileUrl); // This will log the base64 URL of the image
      //this.myBug.BugImgUrl = imgFileUrl.toString()
      (document.getElementById("profileImg") as HTMLImageElement).src = imgFileUrl;
      
    };
    reader.readAsDataURL(imgFile);
  }



  


  editUserInfo() {
    if (
      this.UserInfo.displayName !== "" &&
      this.UserInfo.userName !== "" &&
      this.UserInfo.email !== "" &&
      this.UserInfo.password !== ""
    ) {
      if (this.UserInfo.password !== this.confPassWord) {
        this.messageService.add({ severity: 'warn', summary: 'warning', detail: 'You have to enter the same password' });
      } else {
        // Check if email format is correct
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.UserInfo.email)) {
          this.messageService.add({ severity: 'warn', summary: 'warning', detail: 'Please enter a valid email address' });
        } else {
          this.authService.updateUserInfo(this.UserInfo).subscribe(
            () => {
              // Success case: Handle the successful update
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User info updated successfully' });
              // Additional actions or logic upon successful update
            },
            (error) => {
              // Error case: Handle the error
              console.error('Error updating user info:', error);
              // Display an error message to the user or perform any other necessary actions
              const errorMessage = error?.error?.message || 'Failed to update user info';
              this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
            }
          );
          
          
          
        }
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'warning', detail: 'Please fill all the fields' });
    }
  }
  



}
