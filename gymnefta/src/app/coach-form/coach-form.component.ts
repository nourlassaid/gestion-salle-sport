import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachService } from '../coach.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coach-form',
  templateUrl: './coach-form.component.html',
  styleUrls: ['./coach-form.component.css']
})
export class CoachFormComponent implements OnInit {
  coachForm: FormGroup;
  coachId: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.coachForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      specialite: ['', Validators.required],
      sexe: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.coachId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.coachId;

    if (this.isEditMode && this.coachId) {
      this.coachService.getCoachById(Number(this.coachId)).subscribe({
        next: (coach) => {
          this.coachForm.patchValue(coach);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du coach:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.coachForm.invalid) return;

    if (this.isEditMode && this.coachId) {
      this.coachService.updateCoach(Number(this.coachId), this.coachForm.value).subscribe({
        next: () => {
          console.log('Coach mis à jour avec succès');
          this.router.navigate(['/coaches/list']);
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour du coach:", err);
        }
      });
    } else {
      this.coachService.addCoach(this.coachForm.value).subscribe({
        next: () => {
          console.log('Coach ajouté avec succès');
          this.router.navigate(['/coaches/list']);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du coach:", err);
        }
      });
    }
  }
}
