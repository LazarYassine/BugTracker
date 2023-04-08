import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
    
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
  });
  }

  onSubmit() { 
    this.submitted = true;
    alert(JSON.stringify(this.loginForm.value));
}

}
