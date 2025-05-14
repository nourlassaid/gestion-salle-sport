import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Import

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html'
})
export class AddMemberComponent {
  memberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // ✅ Ajouté ici
  ) {
 this.memberForm = this.fb.group({
  nom: ['', Validators.required],
  prenom: ['', Validators.required],
  telephone: [''],
  date_inscription: [''],
  prix: [''],
  sexe: ['', Validators.required] // ✅ nouveau champ requis
});

  }

  onSubmit() {
    if (this.memberForm.valid) {
      this.http.post('http://localhost:3000/api/members/add', this.memberForm.value)
        .subscribe({
          next: () => {
            // ✅ Redirection après ajout avec paramètre
            this.router.navigate(['/members/list'], { queryParams: { added: 'true' } });
          },
          error: () => alert("Erreur lors de l'ajout du membre.")
        });
    }
  }
}
