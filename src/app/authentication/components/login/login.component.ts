import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    email: string = '';
    password: string = '';
    error: string = '';

    constructor( private router: Router) { }

    login() {
        if ( this.email === 'user' && this.password === 'user' ) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'false');
            this.router.navigate(['/products/shop']);
        } else if ( this.email === 'admin' && this.password === 'admin' ) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'true');
            this.router.navigate(['/products/list']);
        } else {
            this.error = 'Invalid credentials';
        }
    }
}
