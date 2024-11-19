import { Component } from '@angular/core';
import { AddUserComponent } from "./add-user/add-user.component";
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AddUserComponent,FormsModule,NgbDropdownModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent {
  selectedAction: string = "none"

}
