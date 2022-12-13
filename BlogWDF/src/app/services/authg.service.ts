  import { HttpClient } from '@angular/common/http';
  import { EventEmitter, Injectable, Output } from '@angular/core';
  import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
  import { Observable } from 'rxjs';
  import { Token } from '../models/token';
  import { environment } from 'src/environments/environment';
  import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgService implements CanActivate {
 constructor(private loginSvc:  LoginService, private router:Router){}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  if(this.loginSvc.GetCurrentUserToken())
  {
    return true;
  }
  else
  {
    this.router.navigate(['/Login']);
    return false;
  }
 }
}
