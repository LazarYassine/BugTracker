import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-bugs',
  templateUrl: './manage-bugs.component.html',
  styleUrls: ['./manage-bugs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ManageBugsComponent {
  formGroup!: FormGroup;
  //text!: string

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      errorTitle_text: new FormControl(),
      errorDesc_text: new FormControl(),
      errorSolu_text: new FormControl()
  });
  }

  Save() {
    //console.log(this.formGroup.value.text)

    if( this.formGroup.value.errorDesc_text ) {
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    }else {
      this.messageService.add({severity:'error', summary:'Service Message', detail:'Via MessageService'});
    }

  }


  // Preview(e: Event) {
  //   let imgFile = (document.getElementById("uploadImage") as HTMLInputElement).files[0]
  //   const reader = new FileReader()

  //   reader.onload = (e: any) => {
  //     const imgFileUrl = e.target.result;
  //   };
  //   reader.readAsDataURL(imgFile);
  //   console.log(reader.result)

  //   // reader.readAsDataURL(imgFile)
  //   // console.log(reader.result)
  //   //console.log( (document.getElementById("uploadImage") as HTMLInputElement).files[0].name )
  //   //(document.getElementById("Preview") as HTMLImageElement).src = (document.getElementById("uploadImage") as HTMLInputElement).files[0].name 
  // }

  // Preview(e: Event) {
  //   let imgFile = (document.getElementById("uploadImage") as HTMLInputElement).files[0];
  //   const reader = new FileReader();
  
  //   if ( imgFile.name.substring( imgFile.name.lastIndexOf(".")+1, imgFile.name.length ).toUpperCase() != "JPEG" || imgFile.name.substring( imgFile.name.lastIndexOf(".")+1, imgFile.name.length ).toUpperCase() != "PNG" ) {
  //     this.messageService.add({severity:'error', summary:'Wrong Format', detail:'Please choose an image format (jpeg/png).'});
  //     return
  //   }
  //   else if (imgFile.size > 2 * 1024 * 1024) { // Maximum file size is set to 2MB
  //     this.messageService.add({severity:'error', summary:'Large File', detail:'Please choose an image with a smaller file size (maximum 2MB).'});
  //     // alert("Please choose an image with a smaller file size (maximum 2MB).");
  //     return;
  //   }

  //   reader.onload = (e: any) => {
  //     const imgFileUrl = e.target.result;
  //     console.log(imgFileUrl); // This will log the base64 URL of the image
  //     (document.getElementById("Preview") as HTMLImageElement).src = imgFileUrl
  //   };
  //   reader.readAsDataURL(imgFile);
  // }
  
  Preview(e: Event) {
    let imgFile = (document.getElementById("uploadImage") as HTMLInputElement).files[0];
    const reader = new FileReader();
    let extension = imgFile.name.substring(imgFile.name.lastIndexOf(".") + 1).toUpperCase()

    // Check if file format is not jpeg or png
    if ( extension != "JPEG" && extension != "PNG" ) {
      this.messageService.add({severity:'error', summary:'Wrong Format', detail:'Please choose an image format (jpeg/png).'});
      return;
    }
    // Check if file size is larger than 2MB
    else if (imgFile.size > 2 * 1024 * 1024) { // Maximum file size is set to 2MB
      this.messageService.add({severity:'error', summary:'Large File', detail:'Please choose an image with a smaller file size (maximum 2MB).'});
      return;
    }
  
    // Read image file and display preview
    reader.onload = (e: any) => {
      const imgFileUrl = e.target.result;
      console.log(imgFileUrl); // This will log the base64 URL of the image
      (document.getElementById("Preview") as HTMLImageElement).src = imgFileUrl;
    };
    reader.readAsDataURL(imgFile);
  }
  


}
