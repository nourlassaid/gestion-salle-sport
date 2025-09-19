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
  men: Member[] = [];
  women: Member[] = [];
  children: Member[] = [];
  monthKeys: string[] = [];
  searchQuery: string = '';
  memberGroups: { label: string; members: Member[]; }[] | undefined;

  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit() {
    this.fetchMembers();
  }

  // Récupérer tous les membres
  fetchMembers() {
    this.memberService.getMembers().subscribe({
      next: (data: Member[]) => {
        this.members = data;
        this.separateBySex(data);
        this.monthKeys = this.getUniqueMonths(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des membres', err);
      }
    });
  }

  // Séparer les membres par sexe
 separateBySex(members: Member[]) {
  this.children = members.filter(m => +m.enfant === 1);
  this.men = members.filter(m => m.sexe === 'Homme' && +m.enfant === 0);
  this.women = members.filter(m => m.sexe === 'Femme' && +m.enfant === 0);

  // Remplir memberGroups pour le template
  this.memberGroups = [
    { label: '👨 Hommes', members: this.men },
    { label: '👩 Femmes', members: this.women },
    { label: '🧒 Enfants', members: this.children }
  ];
}


  // Obtenir les mois uniques
  getUniqueMonths(members: Member[]): string[] {
    const monthSet = new Set<string>();
    members.forEach(member => {
      if (member.date_inscription) {
        const date = new Date(member.date_inscription);
        const month = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
        monthSet.add(month);
      }
    });
    return Array.from(monthSet).sort((a, b) => this.sortByMonth({ key: a }, { key: b }));
  }

  // Tri des mois
  sortByMonth = (a: any, b: any): number => {
    const parseDate = (key: string) => {
      const [monthName, year] = key.split(' ');
      return new Date(`${monthName} 1, ${year}`).getTime();
    };
    return parseDate(a.key) - parseDate(b.key);
  };

  // Naviguer vers un mois spécifique
  goToMonth(month: string) {
    this.router.navigate(['/members/month', encodeURIComponent(month)]);
  }

  // Recherche de membres
  onSearchChange() {
    const query = this.searchQuery.trim();
    if (!query) {
      this.members = [];
      this.men = [];
      this.women = [];
      this.children = [];
      return;
    }

    this.memberService.searchMembers(query).subscribe({
      next: (results: Member[]) => {
        this.members = results.sort((a, b) => (b.mois_inscrits ?? 0) - (a.mois_inscrits ?? 0));
        this.separateBySex(this.members);
      },
      error: (err) => {
        console.error('Erreur lors de la recherche de membres', err);
        this.members = [];
        this.men = [];
        this.women = [];
        this.children = [];
      }
    });
  }

  // Obtenir le nom d'un mois relatif
  getMonthNameAgo(monthsAgo: number = 0): string {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth() - monthsAgo, 1);
    return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  }
}
