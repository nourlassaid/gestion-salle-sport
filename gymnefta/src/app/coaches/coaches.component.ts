// src/app/pages/coaches/coaches.component.ts
import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/coach.service';
import { Coach } from 'src/app/models/coach.model';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
})
export class CoachesComponent implements OnInit {
  coaches: Coach[] = [];

  constructor(private coachService: CoachService) {}

  ngOnInit(): void {
    this.fetchCoaches();
  }

  fetchCoaches(): void {
    this.coachService.getAllCoaches().subscribe({
      next: (data) => this.coaches = data,
      error: (err) => console.error('Erreur chargement coachs:', err)
    });
  }
}
