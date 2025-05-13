import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Client } from './models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'http://localhost:3000/api/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur chargement clients', error);
        return throwError(() => new Error('Erreur serveur'));
      })
    );
  }

  searchClients(term: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/search?q=${term}`).pipe(
      catchError(error => {
        console.error('Erreur recherche clients', error);
        return throwError(() => new Error('Erreur recherche'));
      })
    );
  }
}
