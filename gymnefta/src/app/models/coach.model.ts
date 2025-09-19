// src/app/models/coach.model.ts
export interface Coach {
description: any;
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  specialite: string;
  sexe: string;
  photo?: string; // optionnel
}
