import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from './models/coach.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = 'http://localhost:3000/api/coaches';  // URL de ton API

  constructor(private http: HttpClient) {}

  // Ajouter un coach
  addCoach(coach: Coach): Observable<Coach> {
    return this.http.post<Coach>(`${this.apiUrl}/add`, coach);
  }

  // Récupérer un coach par son ID
  getCoachById(id: number): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un coach
  updateCoach(id: number, coach: Coach): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, coach);
  }

  // Supprimer un coach
  deleteCoach(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Récupérer la liste des coachs
  getAllCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/list`);
  }
}
