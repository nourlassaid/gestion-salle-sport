export interface Member {
  date_fin: any;
fin_abonnement: string|number|Date;
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  date_inscription: string;
  prix: number;
  sexe: 'Homme' | 'Femme';
  enfant: string;
  mois_inscrits?: number; // <== important
}
