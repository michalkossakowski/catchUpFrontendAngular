import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FaqDetailsComponent } from './faq/faq-details/faq-details.component';
import { SchoolingsComponent } from './schoolings/schoolings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component:  HomeComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'faq/details/:id', component: FaqDetailsComponent },
    { path: 'admin-panel', component: AdminPanelComponent },
    { path: 'schoolings', component: SchoolingsComponent },
    { path: 'feedback', component: FeedbackComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
