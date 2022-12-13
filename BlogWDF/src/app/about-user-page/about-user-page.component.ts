import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-about-user-page',
  templateUrl: './about-user-page.component.html',
  styleUrls: ['./about-user-page.component.css']
})


export class AboutUserPageComponent {

  isEditingUser: boolean = false;

  userId: string | undefined = 'Not logged in.';
  firstName: string | undefined = 'n/a';
  lastName: string | undefined = '';
  email: string | undefined = 'n/a';
  constructor(private loginService: LoginService, private router: Router) {

  }

  isLoggedIn() {
    return this.loginService.isLoggedIn;
  }

  ngOnInit() {
    this.isEditingUser = false;
    let user: User = new User();
    this.loginService.GetCurrentUserInfo()?.subscribe({
      next: data => {
        user = data;

        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.emailAddress;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log("Get User Complete.");
      }
    });
  }


  Logout() {
    this.loginService.Logout();
    this.userId = 'Not logged in.';
    this.firstName = 'n/a';
    this.lastName = '';
    this.email = 'n/a';
    this.router.navigateByUrl('/home');
  }

  ToggleEdit() {
    this.isEditingUser = !this.isEditingUser;
  }

  UpdateOnEdit() {
    this.ngOnInit();
  }
}
