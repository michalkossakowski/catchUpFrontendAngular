import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: 'home', component:  HomeComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'admin-panel', component: AdminPanelComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }