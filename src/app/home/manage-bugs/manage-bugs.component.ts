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

    if( !this.formGroup.value.errorDesc_text ) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }else {
      this.messageService.add({ severity: 'Danger', summary: 'Error', detail: 'Message Content' });
    }

  }

}
