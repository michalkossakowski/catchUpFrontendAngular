import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaqComponent } from "./faq/faq.component";
import { SchoolingsComponent } from './schoolings/schoolings.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FaqComponent, 
    SchoolingsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'catchUpFrontendAngular';
  selectedNav: string = "Home";
}
