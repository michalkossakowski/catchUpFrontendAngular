import { Component } from '@angular/core';
import { AddUserComponent } from "./add-user/add-user.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AddUserComponent,FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent {
  selectedAction: string = "none"

}
