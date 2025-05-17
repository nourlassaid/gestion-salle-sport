import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbonnementService } from 'src/app//abonnement.service';

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
    duree: ['', Validators.required],
  });

  onSubmit() {
    if (this.abonnementForm.valid) {
      this.abonnementService.add(this.abonnementForm.value).subscribe(() => {
        alert('Abonnement ajouté !');
        this.router.navigate(['/subscriptions/list']);
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
