import { Component } from '@angular/core';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-facture-add',
  templateUrl: './facture-add.component.html',
  styleUrls: ['./facture-add.component.css']
})
export class FactureAddComponent {
  facture = { client: '', date: '', montant: '', description: '' };
  file!: File;

  constructor(private factureService: FactureService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();

    // On ajoute les champs texte
    Object.entries(this.facture).forEach(([key, value]) =>
      formData.append(key, value)
    );

    // On ajoute le fichier PDF s’il est sélectionné
    if (this.file) {
      formData.append('facture', this.file);
    }

    // On envoie au backend via le service
    this.factureService.addFacture(formData).subscribe(() => {
      alert('Facture ajoutée !');
    });
  }
}
