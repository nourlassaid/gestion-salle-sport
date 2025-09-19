// stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stats {
  totalMembres: number;
  totalCoachs: number;
  totalMale: number;
  totalFemale: number;
}

export interface MonthlySexStat {
  month: string; // "2025-09"
  totalMale: number;
  totalFemale: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:3000/api/stats';

  constructor(private http: HttpClient) {}

  getGlobalStats(): Observable<Stats> {
    return this.http.get<Stats>(`${this.apiUrl}/global`);
  }

  getMonthlySexStats(): Observable<MonthlySexStat[]> {
    return this.http.get<MonthlySexStat[]>(`${this.apiUrl}/monthly-sex`);
  }
}
