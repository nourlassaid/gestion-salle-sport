import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Receptionniste {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  sexe: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReceptionService {
  private apiUrl = 'http://localhost:3000/api/receptionnistes';

  constructor(private http: HttpClient) {}

  addReceptionniste(data: Receptionniste): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getReceptionnistes(): Observable<Receptionniste[]> {
    return this.http.get<Receptionniste[]>(this.apiUrl);
  }

  updateReceptionniste(id: number, data: Receptionniste): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteReceptionniste(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
