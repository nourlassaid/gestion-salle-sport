import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceptionService } from '../../reception.service';
@Component({
  selector: 'app-add-reception',
  templateUrl: './add-reception.component.html',
})
export class AddReceptionComponent implements OnInit {
  receptionForm!: FormGroup;

  constructor(private fb: FormBuilder, private receptionService: ReceptionService) {}

  ngOnInit(): void {
    this.receptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexe: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.receptionForm.valid) {
      this.receptionService.addReceptionniste(this.receptionForm.value).subscribe({
        next: () => {
          alert('Réceptionniste ajoutée avec succès');
          this.receptionForm.reset();
        },
        error: () => alert('Erreur lors de l’ajout'),
      });
    }
  }
}
