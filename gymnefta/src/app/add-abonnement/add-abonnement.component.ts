import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbonnementService } from 'src/app/abonnement.service';

@Component({
  selector: 'app-add-abonnement',
  templateUrl: './add-abonnement.component.html',
  styleUrls: ['./add-abonnement.component.css']
})
export class AddAbonnementComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private abonnementService: AbonnementService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  abonnementForm = this.fb.group({
    nom: ['', Validators.required],
    description: [''],
    prix: ['', Validators.required],
    duree: ['', [Validators.required, Validators.min(1)]], // nombre de mois
  });

  onSubmit() {
    if (this.abonnementForm.valid) {
      const data = {
        ...this.abonnementForm.value,
        duree: parseInt(this.abonnementForm.value.duree, 10) // convertir en nombre
      };
      this.abonnementService.add(data).subscribe(() => {
        alert('Abonnement ajouté !');
        this.router.navigate(['/subscriptions/list']);
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
