import { Component, OnInit } from '@angular/core';
import { SchoolingService } from '../../services/schooling.service';
import { FullSchoolingDto } from '../../Dtos/fullSchooling.dto';

@Component({
  selector: 'app-schooling-list',
  standalone: true,
  imports: [

],
  templateUrl: './schooling-list.component.html',
  styleUrl: './schooling-list.component.css'
})
export class SchoolingsListComponent implements OnInit {
  fullschoolings: FullSchoolingDto[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private schoolingService: SchoolingService) {}

  ngOnInit(): void {
    this.loadSchoolings();
  }

  loadSchoolings(): void {
    this.schoolingService.getAllSchoolings().subscribe(
      (response) => {
        this.fullschoolings = response.data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load schoolings';
        this.loading = false;
      }
    );
  }
}

