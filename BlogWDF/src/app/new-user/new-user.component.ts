import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  userId = "";
  email = "";
  password = "";
  firstName = "";
  lastName = "";

  constructor(private loginService: LoginService, private router :Router){

  }
  
  CreateUser(){
    this.loginService.CreateNewUser(this.userId,this.firstName,this.lastName,this.email,this.password);
    this.userId = '';
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.router.navigateByUrl('/login');
  }
}

