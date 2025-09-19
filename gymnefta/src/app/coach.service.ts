import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from './models/coach.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = 'http://localhost:3000/api/coaches';

  constructor(private http: HttpClient) {}

  addCoach(coach: Coach): Observable<Coach> {
    return this.http.post<Coach>(`${this.apiUrl}/add`, coach);
  }

  getAllCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/list`);
  }

  getCoachById(id: number): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/${id}`);
  }

updateCoach(id: number, coach: Coach) {
  return this.http.put(`${this.apiUrl}/update/${id}`, coach);
}


  deleteCoach(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  
}
