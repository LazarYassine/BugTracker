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
    console.log(this.router.url)
    if( !localStorage.getItem("auth_token") && this.router.url == '/' ) {
      //alert("You are not logged in Or your session in Ended !!!")
      console.log(this.router.url)
      this.router.navigateByUrl("auth/login")
    }
    else if ( this.router.url == "/" ) {
      this.router.navigateByUrl('Home/BugsList')
      console.log(this.router.url)
    }

  }

}
