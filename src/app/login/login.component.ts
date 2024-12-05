import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./login.component.html`,
  styleUrl: `./login.component.css`
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (loginSuccessful) => {
        if (loginSuccessful) {
          this.router.navigate(['/home']);
        } else {
          this.loginError = true;
        }
      },
      error: (error) => {
        this.loginError = true;
        console.error('Login error', error);
      }
    });
  }
}
