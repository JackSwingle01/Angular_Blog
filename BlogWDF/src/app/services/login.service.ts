import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Token } from '../models/token';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  @Output() userLoggedIn = new EventEmitter<boolean>;
  currentUserToken: Token | undefined;
  isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {
    let tokenInstance = localStorage.getItem('token');
    this.currentUserToken = tokenInstance ? JSON.parse(tokenInstance) : null;
  }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   return true;
  // }

  Login(userId: string, password: string) {
    let response = this.httpClient.get<Token>(`${environment.serverEndpoint}/users/${userId}/${password}`);
    if (response) {
      response.subscribe({
        next: (data) => {
          this.SetCurrentUser(data, userId);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Complete')
        }
      });
    }
    return response;
  }



  Logout() {
    this.currentUserToken = undefined;
    this.isLoggedIn = false;
    this.userLoggedIn.emit(false);
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
  }

  SetCurrentUser(token: Token, id: string) {
    this.currentUserToken = token;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('id', id);
    this.userLoggedIn.emit(true);
    this.isLoggedIn = true;
  }
  GetCurrentUserToken() {
    return this.currentUserToken;
  }
  GetCurrentUserInfo() {

    if (this.isLoggedIn) {
      let user: User = new User();
      let header = this.CreateAuthHeader();
      return this.httpClient.get<any>(`${environment.serverEndpoint}/users/${localStorage.getItem('id')}`, { headers: header });

    }
    else {
      return undefined;
    }


  }
  CreateNewUser(userId: string, firstName: string, lastName: string, emailAddress: string, password: string) {
    let newUser = { userId: userId, firstName: firstName, lastName: lastName, emailAddress: emailAddress, password: password };
    let response = this.httpClient.post(`${environment.serverEndpoint}/users`, newUser);
    response.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Complete");
      }
    });
    return response;
  }

  EditUser(firstName: string, lastName: string, emailAddress: string, password: string | undefined) {
    let header = this.CreateAuthHeader();
    if (password) {
      return this.httpClient.patch(`${environment.serverEndpoint}/users/${localStorage.getItem('id')}`, { firstName: firstName, lastName: lastName, emailAddress: emailAddress, password: password }, { headers: header });
    } else {
      return this.httpClient.patch(`${environment.serverEndpoint}/users/${localStorage.getItem('id')}`, { firstName: firstName, lastName: lastName, emailAddress: emailAddress }, { headers: header });
    }

  }

  CreateAuthHeader() {
    let tokenString = localStorage.getItem("token");
    let header = new HttpHeaders();
    if (tokenString) {
      let tokenToken: Token = JSON.parse(tokenString) as Token;
      header = header.set('authorization', `Bearer ${tokenToken.token}`);
    }
    return header;
  }

}
