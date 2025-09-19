import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
date: string|number|Date;
  id: number;
  message: string;
  statut: 'Non lue' | 'Lue';
  created_at: string;
  seen?: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  markAsRead(id: number) {
    return this.http.post(`${this.apiUrl}/mark-as-read/${id}`, {});
  }

  markAllAsRead() {
    return this.http.post(`${this.apiUrl}/mark-all-as-read`, {});
  }
}
