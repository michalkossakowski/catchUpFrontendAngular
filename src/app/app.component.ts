import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UserDto} from './Dtos/user.dto';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'catchUpFrontendAngular';
  selectedNav: string = "Home";
  isNavbarCollapsed: boolean = true;
  user: UserDto | undefined;
  isAdmin: boolean | undefined;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) {
    this.authService.isLoggedIn$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated) {
        setTimeout(() => {
          this.userService.getLoggedInUser().subscribe((user) => this.user = user);
          if (this.user?.id) {
            this.userService.getRole(this.user.id).subscribe((role) => {
              this.isAdmin = role.toUpperCase() === "ADMIN";
            });
          }
        }, 50)
        console.log(this.user);

      } else {
        this.isAdmin = undefined;
      }
    });
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.clear();
    window.location.reload();
  }
}