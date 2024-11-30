import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { FaqComponent } from "./faq/faq.component";
import { SchoolingsComponent } from './schoolings/schoolings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FaqComponent,
    SchoolingsComponent,
    FeedbackComponent,
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
}
