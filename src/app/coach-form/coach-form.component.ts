// src/app/coach-form/coach-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachService } from '../coach.service';
import { Coach } from '../models/coach.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coach-form',
  templateUrl: './coach-form.component.html',
  styleUrls: ['./coach-form.component.css']
})
export class CoachFormComponent implements OnInit {
  coachForm: FormGroup;
  coachId: number | null = null;
isEditMode: any;

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.coachForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      specialite: ['', Validators.required],
      sexe: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.coachId = this.route.snapshot.params['id'];
    if (this.coachId) {
      this.coachService.getCoachById(this.coachId).subscribe(
        (coach) => {
          this.coachForm.patchValue(coach);
        },
        (err) => {
          console.error('Erreur lors de la récupération du coach:', err);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.coachForm.valid) {
      if (this.coachId) {
        this.coachService.updateCoach(this.coachId, this.coachForm.value).subscribe({
          next: () => {
            console.log('Coach mis à jour avec succès');
            this.router.navigate(['/coaches/list']); // Rediriger après la mise à jour
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du coach:', err);
          }
        });
      } else {
        this.coachService.addCoach(this.coachForm.value).subscribe({
          next: () => {
            console.log('Coach ajouté avec succès');
            this.router.navigate(['/coaches/list']); // Rediriger après l'ajout
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du coach:', err);
          }
        });
      }
    }
  }
}
