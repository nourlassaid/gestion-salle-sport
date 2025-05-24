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

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.API_URL).pipe(
      catchError(err => {
        console.error('Erreur getMembers:', err);
        return throwError(() => new Error('Erreur lors du chargement des membres'));
      })
    );
  }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.API_URL}/${id}`).pipe(
      catchError(err => {
        console.error('Erreur getMember:', err);
        return throwError(() => new Error('Erreur lors de la récupération du membre'));
      })
    );
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.API_URL}/add`, member).pipe(
      catchError(err => {
        console.error('Erreur addMember:', err);
        return throwError(() => new Error('Erreur lors de l\'ajout du membre'));
      })
    );
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.API_URL}/${id}`, member).pipe(
      catchError(err => {
        console.error('Erreur updateMember:', err);
        return throwError(() => new Error('Erreur lors de la mise à jour du membre'));
      })
    );
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      catchError(err => {
        console.error('Erreur deleteMember:', err);
        return throwError(() => new Error('Erreur lors de la suppression du membre'));
      })
    );
  }

  searchMembers(query: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.API_URL}/search?query=${encodeURIComponent(query)}`).pipe(
      catchError(err => {
        console.error('Erreur searchMembers:', err);
        return throwError(() => new Error('Erreur lors de la recherche de membres'));
      })
    );
  }
}
