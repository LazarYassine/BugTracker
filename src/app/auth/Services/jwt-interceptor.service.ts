import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Assuming you have a JWT token as a string
    const token = localStorage.getItem("auth_token")

    if( token == null ) {
      return next.handle(request)
    }

    // Decode the JWT token
    const decodedToken =  jwtDecode(token);
    //console.log(decodedToken["exp"])
    // Get the expiration time from the decoded token
    const expirationTime = decodedToken["exp"] * 1000;  // Convert to milliseconds

    // Get the current time
    const currentTime = new Date().getTime();

    console.log(this.router.url)
    // Compare the current time with the token's expiration time
    if (expirationTime < currentTime && this.router.url != "/auth/login" && this.router.url != "/auth/signup") {
      // Token is expired
      console.log('Token has expired');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your session has expired!'
      })
      this.router.navigateByUrl("auth/login")
      
      return next.handle(request)
      
    }
    else {
      // Get the JWT token from wherever it's stored in your application
      const jwtToken = token;

      // Clone the request and add the JWT token to the headers
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      // Pass the cloned request to the next handler
      return next.handle(clonedRequest);
    }
    


  }

}
