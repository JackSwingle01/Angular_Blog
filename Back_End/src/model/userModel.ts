export class User {
    userId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;

    constructor(userId: string = '',
        firstName: string = '',
        lastName: string = '',
        emailAdress: string = '',
        password: string = '') {

        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAdress;
        this.password = password;
    }

    public isValidUser() {
        return (this.userId && this.firstName && this.lastName && this.emailAddress && this.password);
    }
    public hasValidEmail(): boolean {
        if (this.emailAddress.includes('@') && this.emailAddress.includes('.')) {
            let email = this.emailAddress.split('@');
            if (email[0] && email[1] && !email[2]) {
                email = this.emailAddress.split('.');
                if (email[0] && email[1] && !email[2]) {
                    return true;
                }
            }
        }
        return false;
    }

}