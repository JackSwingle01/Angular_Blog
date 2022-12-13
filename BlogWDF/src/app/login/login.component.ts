import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: LoginService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  userName = '';
  password = '';
  error = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params);
      this.userName = params['userName'];
    });
  }

  Login() {
    this.auth.Login(this.userName, this.password).subscribe({
    });

    this.router.navigateByUrl('/home');
  }


}
