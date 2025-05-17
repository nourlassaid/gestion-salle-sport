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
  loading = false;

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.coachForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      specialite: ['', Validators.required],
      sexe: ['', Validators.required]
    });
  }

  // Soumission du formulaire
  onSubmit(): void {
    console.log('Formulaire soumis'); // Test console

    if (this.coachForm.valid) {
      this.loading = true;
      const coachData = this.coachForm.value;

      this.coachService.addCoach(coachData).subscribe({
        next: () => {
          alert('Coach ajouté avec succès !');
          this.coachForm.reset();
          this.loading = false;
          this.router.navigate(['/coaches/list']); // Redirection vers la liste
        },
        error: (err) => {
          console.error('Erreur ajout coach:', err);
          alert("Erreur lors de l'ajout du coach.");
          this.loading = false;
        }
      });
    } else {
      this.coachForm.markAllAsTouched(); // Affiche les erreurs
    }
  }
}
