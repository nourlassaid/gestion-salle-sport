import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoachService } from '../coach.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-coach',
  templateUrl: './add-coach.component.html',
  styleUrls: ['./add-coach.component.css']
})
export class AddCoachComponent {
  coachForm: FormGroup;
  loading = false;  // Variable pour afficher l'état de chargement

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService,
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

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.coachForm.valid) {
      this.loading = true;  // Démarre le chargement
      console.log('Formulaire envoyé avec ces données :', this.coachForm.value);
      this.coachService.addCoach(this.coachForm.value).subscribe({
        next: () => {
          console.log('Coach ajouté avec succès');
          this.loading = false;  // Fin du chargement
          this.router.navigate(['/coaches/list']); // Redirige après l'ajout
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du coach:', err);
          this.loading = false;  // Fin du chargement même en cas d'erreur
        }
      });
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }
}
