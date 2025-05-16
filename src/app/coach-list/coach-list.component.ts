// src/app/coach-list/coach-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CoachService } from '../coach.service';
import { Coach } from '../models/coach.model';  // Importer le modèle Coach
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {
  coaches: Coach[] = [];  // Déclarer coaches comme étant un tableau de type Coach

  constructor(private coachService: CoachService, private router: Router) {}

  ngOnInit(): void {
    this.getCoaches();
  }

  // Récupérer la liste des coachs
  getCoaches(): void {
    this.coachService.getAllCoaches().subscribe(
      (data) => {
        this.coaches = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des coachs:', error);
      }
    );
  }

  // Demander une confirmation avant de supprimer
  onDelete(id: number): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce coach ?');
    if (confirmDelete) {
      this.coachService.deleteCoach(id).subscribe(
        () => {
          this.coaches = this.coaches.filter((coach) => coach.id !== id); // Filtrer le coach supprimé
        },
        (error) => {
          console.error('Erreur lors de la suppression du coach:', error);
        }
      );
    }
  }

  // Méthode pour rediriger vers le formulaire de modification
  onEdit(coach: Coach): void {
    this.router.navigate(['/edit-coach', coach.id]); // Rediriger vers la page de modification
  }
}
