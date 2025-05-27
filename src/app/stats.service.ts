import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private baseUrl = 'http://localhost:3000/api/stats';

  constructor(private http: HttpClient) {}

  getGlobalStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getMonthlyMemberStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/members/monthly-sex`);
  }
}
