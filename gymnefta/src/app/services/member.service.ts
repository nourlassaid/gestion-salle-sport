// src/app/services/member.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Member } from '../models/Member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private API_URL = 'http://localhost:3000/api/members';

  constructor(private http: HttpClient) {}

  // Récupérer tous les membres
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer un membre par id
  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Ajouter un membre
  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.API_URL}/add`, member).pipe(
      catchError(this.handleError)
    );
  }

  // Modifier un membre
  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.API_URL}/${id}`, member).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer un membre
  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // 🔍 Rechercher des membres par mot-clé
  searchMembers(query: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.API_URL}/search?q=${encodeURIComponent(query)}`).pipe(
      catchError(this.handleError)
    );
  }

  // 📅 Récupérer les membres dont l'abonnement est expiré
  getExpiredMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.API_URL}/expired`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: any) {
    console.error('Erreur API:', error);
    return throwError(() => new Error(error.message || 'Erreur serveur'));
  }
}
