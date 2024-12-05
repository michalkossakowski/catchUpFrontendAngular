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
import {TaskComponent} from "./task/task.component";

export const routes: Routes = [
    { path: '', component: LoginComponent }, // Login page
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'faq',
        component: FaqComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'faq/details/:id',
        component: FaqDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin-panel',
        component: AdminPanelComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'schoolings',
        component: SchoolingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'feedback',
        component: FeedbackComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks',
        component: TaskComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
