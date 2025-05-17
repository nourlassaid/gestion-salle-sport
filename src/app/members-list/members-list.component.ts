
// members-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { Member } from '../models/Member.model';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  members: Member[] = [];
  groupedMembers: { [month: string]: Member[] } = {};
  monthKeys: string[] = [];
  searchQuery: string = '';

  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit() {
    this.fetchMembers();
  }

  fetchMembers() {
    this.memberService.getMembers().subscribe(data => {
      this.members = data;
      this.groupedMembers = this.groupMembersByMonth(data);
      this.monthKeys = Object.keys(this.groupedMembers).sort((a, b) => this.sortByMonth({ key: a }, { key: b }));
    });
  }

  groupMembersByMonth(members: Member[]): { [month: string]: Member[] } {
    const grouped: { [month: string]: Member[] } = {};
    members.forEach(member => {
      const date = new Date(member.date_inscription);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(member);
    });
    return grouped;
  }

  sortByMonth = (a: any, b: any): number => {
    const parseDate = (key: string) => {
      const [monthName, year] = key.split(' ');
      return new Date(`${monthName} 1, ${year}`).getTime();
    };
    return parseDate(a.key) - parseDate(b.key);
  };

  goToMonth(month: string) {
    this.router.navigate(['/members/month', encodeURIComponent(month)]);
  }

  onSearchChange() {
    if (this.searchQuery.trim() === '') {
      this.fetchMembers();
    } else {
      this.memberService.searchMembers(this.searchQuery).subscribe(results => {
        this.members = results;
        this.groupedMembers = this.groupMembersByMonth(results);
        this.monthKeys = Object.keys(this.groupedMembers).sort((a, b) => this.sortByMonth({ key: a }, { key: b }));
      });
    }
  }
}