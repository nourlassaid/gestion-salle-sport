import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:3000/api/factures';

  constructor(private http: HttpClient) {}

  // ✅ Ajouter une facture (FormData : texte + PDF)
  addFacture(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  // ✅ Récupérer toutes les factures
  getFactures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ Supprimer une facture
  deleteFacture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ (Optionnel) Récupérer une facture par ID (pour edit)
  getFactureById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ (Optionnel) Modifier une facture
  updateFacture(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }
}
