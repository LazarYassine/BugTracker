import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin_side';

  constructor(private router: Router){

  }

  ngOnInit() {
  //   if( localStorage.getItem("auth_token") == null || localStorage.getItem("auth_token") == '' ) {
  //     this.router.navigateByUrl("notAllowed")
  // }
  }

}
