import { Component, Input } from '@angular/core';
import { UserDto } from '../../Dtos/user.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newbie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newbie-details.component.html',
  styleUrl: './newbie-details.component.css'
})
export class NewbieDetailsComponent {
  @Input() user: UserDto | null = null
}
