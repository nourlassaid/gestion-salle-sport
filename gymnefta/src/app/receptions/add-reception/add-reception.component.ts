import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceptionService, Receptionniste } from '../../reception.service';

@Component({
  selector: 'app-add-reception',
  templateUrl: './add-reception.component.html'
})
export class AddReceptionComponent implements OnInit {
  receptionForm!: FormGroup;

  @Output() receptionAdded = new EventEmitter<Receptionniste>();

  constructor(private fb: FormBuilder, private receptionService: ReceptionService) {}

  ngOnInit(): void {
    this.receptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexe: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.receptionForm.valid) {
      this.receptionService.addReceptionniste(this.receptionForm.value).subscribe({
        next: (res) => {
          alert('✅ Réceptionniste ajoutée avec succès');
          this.receptionAdded.emit(res); // Émettre pour mettre à jour la liste
          this.receptionForm.reset();
        },
        error: (err) => {
          if (err.error?.error === 'Email déjà utilisé') {
            alert('⚠️ Cet email est déjà utilisé');
          } else {
            alert('❌ Erreur lors de l’ajout');
          }
        }
      });
    }
  }
}
