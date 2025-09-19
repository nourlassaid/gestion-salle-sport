import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<{ user: AdminUser }> {
    return this.http.post<{ user: AdminUser }>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: { username: string; name: string; password: string; avatar?: string }): Observable<any> {
    console.log('Sending register:', credentials); // DEBUG
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  logout(): void {
    localStorage.removeItem('adminUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('adminUser');
  }

  getCurrentUser(): AdminUser | null {
    const storedUser = localStorage.getItem('adminUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  setCurrentUser(user: AdminUser): void {
    localStorage.setItem('adminUser', JSON.stringify(user));
  }
}
