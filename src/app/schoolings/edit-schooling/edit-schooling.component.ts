import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolingService } from '../../services/schooling.service';

@Component({
  selector: 'app-edit-schooling',
  standalone: true,
  imports: [],
  templateUrl: './edit-schooling.component.html',
  styleUrl: './edit-schooling.component.css'
})
export class EditSchoolingComponent {
  public schoolingId: number;
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schoolingService: SchoolingService
  ){
    this.schoolingId = +this.route.snapshot.paramMap.get('schoolingId')!;
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  public saveChanges(): void {
  }
}

