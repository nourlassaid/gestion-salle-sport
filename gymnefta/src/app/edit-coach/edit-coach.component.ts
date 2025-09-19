import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachService } from '../coach.service';
import { Coach } from '../models/coach.model';

@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.css']
})
export class EditCoachComponent implements OnInit {
  coachForm: FormGroup;
  coachId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService,
    private route: ActivatedRoute,
    private router: Router
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
    this.coachId = +this.route.snapshot.paramMap.get('id')!;
    this.getCoachById(this.coachId);
  }

  getCoachById(id: number) {
    this.coachService.getCoachById(id).subscribe({
      next: (coach: Coach) => this.coachForm.patchValue(coach),
      error: (err) => console.error('Erreur récupération coach:', err)
    });
  }

  onSubmit() {
    if (this.coachForm.valid) {
      this.loading = true;
      this.coachService.updateCoach(this.coachId, this.coachForm.value).subscribe({
        next: () => {
          alert('Coach modifié avec succès !');
          this.loading = false;
          this.router.navigate(['/coaches/list']);
        },
        error: (err) => {
          console.error('Erreur modification coach:', err);
          alert('Erreur lors de la modification.');
          this.loading = false;
        }
      });
    } else {
      this.coachForm.markAllAsTouched();
    }
  }
}
