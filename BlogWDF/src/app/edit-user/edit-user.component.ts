import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;
  @Input() emailAddress: string | undefined;

  @Output() UserEdited = new EventEmitter;

  password : string | undefined;

  isError: boolean = false;

  constructor(private loginService: LoginService) {

  }

  Edit() {
    if (this.firstName && this.lastName && this.emailAddress) {
      this.isError = false;
      this.loginService.EditUser(this.firstName, this.lastName, this.emailAddress,this.password).subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
        complete: () => console.log("Edit User Complete.")
      });   
      this.UserEdited.emit();
    } else {
      this.isError = true;
    }
  }

}
