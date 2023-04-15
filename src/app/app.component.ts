import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BugTracker';

  constructor(private router: Router) {}

  ngOnInit(){
    if( !localStorage.getItem("auth_token") && this.router.url == '/' ) {
      alert("You are not logged in Or your session in Ended !!!")
      console.log(this.router.url)
      this.router.navigateByUrl("auth/login")
    }
  }

}
