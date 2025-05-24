import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanningService {
  private apiUrl = 'http://localhost:3000/api/planning';

  constructor(private http: HttpClient) {}

  getPlannings(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/images`);
  }
}
