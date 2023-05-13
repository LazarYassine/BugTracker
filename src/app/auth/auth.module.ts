import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
// import { PanelModule, InputTextModule, ButtonModule } from 'primeng';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ManageUserProfileComponent } from './manage-user-profile/manage-user-profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ManageUserProfileComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AuthModule { }
