import { Component, OnInit } from '@angular/core';
import { CoachService } from '../coach.service';
import { Coach } from '../models/coach.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {
  coaches: Coach[] = [];

  constructor(private coachService: CoachService, private router: Router) {}

  ngOnInit(): void {
    this.getCoaches();
  }

  getCoaches(): void {
    this.coachService.getAllCoaches().subscribe(
      (data) => this.coaches = data,
      (error) => console.error('Erreur récupération coachs:', error)
    );
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce coach ?')) {
      this.coachService.deleteCoach(id).subscribe(
        () => this.coaches = this.coaches.filter(c => c.id !== id),
        (error) => console.error('Erreur suppression coach:', error)
      );
    }
  }

  onEdit(coach: Coach): void {
    this.router.navigate(['/edit-coach', coach.id]);
  }
}
