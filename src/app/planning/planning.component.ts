// src/app/components/planning/planning.component.ts
import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  plannings: string[] = [];

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.planningService.getPlannings().subscribe({
      next: (data) => {
        console.log('Plannings reçus :', data);
        this.plannings = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des plannings :', err);
      }
    });
  }
}
