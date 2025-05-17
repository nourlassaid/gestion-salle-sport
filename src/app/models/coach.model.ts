// src/app/models/coach.model.ts
export interface Coach {
  id?: number;  // L'id est optionnel lors de l'ajout
  nom: string;
  prenom: string;
  telephone: string;
  specialite: string;
  sexe: string;
}
