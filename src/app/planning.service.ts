import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:3000/api/factures';

  constructor(private http: HttpClient) {}

  // ✅ Ajouter une facture avec fichier PDF
  addFacture(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  // ✅ Récupérer toutes les factures
  getFactures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ❌ Facultatif : Supprimer une facture (nécessite backend)
  deleteFacture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
