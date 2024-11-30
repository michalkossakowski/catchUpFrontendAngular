import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FaqDetailsComponent } from './faq/faq-details/faq-details.component';
import { SchoolingsComponent } from './schoolings/schoolings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Login page
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard] // Protect home route
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard] // Protect FAQ route
  },
  {
    path: 'faq/details/:id',
    component: FaqDetailsComponent,
    canActivate: [AuthGuard] // Protect FAQ details route
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard] // Protect admin panel route
  },
  {
    path: 'schoolings',
    component: SchoolingsComponent,
    canActivate: [AuthGuard] // Protect schoolings route
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard] // Protect feedback route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
