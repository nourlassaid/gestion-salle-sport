import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/Member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private API_URL = 'http://localhost:3000/api/members';

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.API_URL);
  }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.API_URL}/${id}`);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.API_URL}/add`, member);
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.API_URL}/${id}`, member);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  searchMembers(query: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.API_URL}/search?query=${encodeURIComponent(query)}`);
  }
}
