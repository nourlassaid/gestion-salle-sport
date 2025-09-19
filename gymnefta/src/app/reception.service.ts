import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  providedIn: 'root'
})
export class ReceptionService {
  private API_URL = 'http://localhost:3000/api/receptionnistes';

  constructor(private http: HttpClient) {}

  addReceptionniste(data: Receptionniste): Observable<Receptionniste> {
    return this.http.post<Receptionniste>(this.API_URL, data);
  }

  getReceptionnistes(): Observable<Receptionniste[]> {
    return this.http.get<Receptionniste[]>(this.API_URL);
  }

  deleteReceptionniste(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
