import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-manage-user-profile',
  templateUrl: './manage-user-profile.component.html',
  styleUrls: ['./manage-user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageUserProfileComponent {

  CurrentUserName = ''

  ngOnInit() {
    this.CurrentUserName = localStorage.getItem("username")
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


}
