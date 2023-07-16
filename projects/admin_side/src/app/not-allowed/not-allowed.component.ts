import { Component } from '@angular/core';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css']
})
export class NotAllowedComponent {

  ngOnInit(){
    // Retrieve the value of the 'auth' query parameter
var params = new URLSearchParams(window.location.search);
var authValue = params.get('auth');

    

// if (authValue === 'your_random_text_here') {
//   console.log('Authenticated user');
// } else {
//   console.log('Non-authenticated user');
// }

  }

}
