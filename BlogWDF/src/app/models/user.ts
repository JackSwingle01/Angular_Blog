
export class User {

    userId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
  
    constructor(userId: string = '', firstName: string = '', lastName: string = '', emailAddress: string = '') {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAddress;
  
    }
}