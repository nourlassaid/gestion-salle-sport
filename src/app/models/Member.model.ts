export interface Member {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  date_inscription: string;
  prix: number;
  sexe: string;
  enfant: string;
  mois_inscrits?: number; // <== important
}
