import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'] // ou .scss si tu utilises SCSS
})
export class PlanningComponent implements OnInit {
  plannings: string[] = [];

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.planningService.getPlannings().subscribe({
      next: (data) => {
        console.log('Images planning reçues :', data);
        this.plannings = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des plannings :', err);
      }
    });
  }
}
