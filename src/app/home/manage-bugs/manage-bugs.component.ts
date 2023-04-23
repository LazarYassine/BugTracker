import { Component, ViewEncapsulation, Input  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Bug from 'src/app/auth/Models/Bug';
import { BugsService } from 'src/app/auth/Services/bugs.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-manage-bugs',
  templateUrl: './manage-bugs.component.html',
  styleUrls: ['./manage-bugs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ManageBugsComponent {
  
  EditMode = false

  myBug: Bug = {
    BugID : 0,
    Title : '',
    BugDesc : '',
    BugDetail : '',
    BugSolution : '',
    BugImgUrl : ''
  } 

  formGroup!: FormGroup;
  //text!: string

  @Input() data: any

  constructor(private messageService: MessageService, private bugeService: BugsService,  public ref?: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      errorTitle_text: new FormControl(),
      errorDesc_text: new FormControl(),
      errorDetail_text: new FormControl(),
      errorSolu_text: new FormControl()
  });
  this.data = this.ref.data
  if( this.data  ) {
    //alert( "Alhamdulillah" )
    //this.formGroup.value.errorTitle_text = this.data["title"].toString()
//    ( document.getElementById("txtTitle") as HTMLInputElement ).value = this.data["title"].toString()
    this.formGroup.get("errorTitle_text").setValue(this.data["title"].toString());
    this.formGroup.get("errorDesc_text").setValue(this.data["bugDesc"].toString());
    this.formGroup.get("errorDetail_text").setValue(this.data["bugDetail"].toString());
    this.formGroup.get("errorSolu_text").setValue(this.data["bugSolution"].toString());
    (document.getElementById("Preview") as HTMLImageElement).src = this.data["bugImgUrl"].toString()
    this.EditMode = true

  }
  console.log("hhh")
  console.log(this.ref.data)
  console.log(this.data["title"])
  console.log(this.formGroup.value.errorTitle_text)


  }

  Save() {
    console.log(this.formGroup.value)

    if( this.formGroup.value.errorDesc_text && this.formGroup.value.errorTitle_text && this.formGroup.value.errorDetail_text && this.formGroup.value.errorSolu_text ) {
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});

      this.myBug.Title = this.formGroup.value.errorTitle_text
      this.myBug.BugDesc = this.formGroup.value.errorDesc_text
      this.myBug.BugDetail = this.formGroup.value.errorDetail_text
      this.myBug.BugSolution = this.formGroup.value.errorSolu_text
      console.log(this.myBug)

      this.bugeService.addBug(this.myBug).subscribe()

    }else {
      this.messageService.add({severity:'warn', summary:'Service Message', detail:'You need to fill all the informations'});
    }

  }

  Edit(){
    alert("Edited")
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
      //this.myBug.BugImgUrl = imgFileUrl.toString()
      (document.getElementById("Preview") as HTMLImageElement).src = imgFileUrl;
      this.myBug.BugImgUrl = (document.getElementById("Preview") as HTMLImageElement).src
    };
    reader.readAsDataURL(imgFile);
  }
  




}
