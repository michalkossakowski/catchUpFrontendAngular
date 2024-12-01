import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <form (ngSubmit)="onLogin()">
        <input
          type="text"
          [(ngModel)]="username"
          name="username"
          placeholder="Username"
          required
        >
        <input
          type="password"
          [(ngModel)]="password"
          name="password"
          placeholder="Password"
          required
        >
        <button type="submit">Login</button>
        <p *ngIf="loginError" class="error">Invalid credentials</p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .error { color: red; }
  `]
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
        // Handle any unexpected errors
        this.loginError = true;
        console.error('Login error', error);
      }
    });
  }
}
