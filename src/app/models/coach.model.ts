// src/app/models/coach.model.ts
export interface Coach {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  specialite: string;
  sexe: string;
  photo?: string; // optionnel
}
