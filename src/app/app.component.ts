import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDto } from './Dtos/user.dto';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'catchUpFrontendAngular';
  selectedNav: string = "Home";
  isNavbarCollapsed: boolean = true;
  user: UserDto | undefined;

  constructor(private userService: UserService){
    this.userService.getLoggedInUser().subscribe((user) => this.user = user);
  }
  
}
