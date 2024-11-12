/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';  
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';  
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),  
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
