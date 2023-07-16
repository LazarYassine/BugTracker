import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      //alert("hhhh")
      
      try {

        const exp = localStorage.getItem("exp")

      if ( exp === null ){
        this.router.navigateByUrl("notAllowed")
      }else {
        
        // Decode the JWT token
          //const decodedToken = jwtDecode(token);
          //console.log(decodedToken["exp"])
          // Get the expiration time from the decoded token
          
          const expirationTime = new Date(parseInt(exp));  
          //alert(expirationTime)
          // Get the current time
          const currentTime = new Date();
          
          if( expirationTime.toString() == "Invalid Date" ) {
            console.log('Token has expired');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your session has expired!'
            })
            this.router.navigateByUrl("notAllowed")
          }

          if ( expirationTime < currentTime ) {
            // Token is expired
            //console.log('Token has expired');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your session has expired!'
            })
    
            this.router.navigateByUrl("notAllowed")
          }
          else if ( localStorage.getItem("role") != null  ) {
            if( localStorage.getItem("role").toLowerCase() != "admin" ) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This Space is only for admins!'
              })
              this.router.navigateByUrl("notAllowed")
            }
            else{
              return true
            }
            
          }
          else {
            return true
          }
    
          
      }


      }
      catch {
        this.router.navigateByUrl("notAllowed")
      }


            


      
      // console.log(this.router.url)
      // Compare the current time with the token's expiration time
      
    }

  }
