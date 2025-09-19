import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { Member } from '../models/Member.model';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-month-members',
  templateUrl: './month-members.component.html',
  styleUrls: ['./month-members.component.css']
})
export class MonthMembersComponent implements OnInit {
  monthName: string = '';
  allMembers: Member[] = [];
  men: Member[] = [];
  women: Member[] = [];
  children: Member[] = [];
  displayedMembers: Member[] = [];
  searchQuery: string = '';
  activeGroup: 'men' | 'women' | 'children' = 'men';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const month = decodeURIComponent(params.get('month') || '');
      this.monthName = month;
      this.loadMembersForMonth(month);
    });
  }

  // Charger les membres du mois
  loadMembersForMonth(month: string) {
    this.memberService.getMembers().subscribe(data => {
      const grouped = this.groupMembersByMonth(data);
      this.allMembers = grouped[month] || [];
      this.separateBySex();
      this.setActiveGroup('men'); // par défaut hommes
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

  // Séparer par groupe
  separateBySex() {
    this.children = this.allMembers.filter(m => +m.enfant === 1);
    this.men = this.allMembers.filter(m => m.sexe === 'Homme' && +m.enfant === 0);
    this.women = this.allMembers.filter(m => m.sexe === 'Femme' && +m.enfant === 0);
  }

  // Sélectionner le groupe actif
  setActiveGroup(group: 'men' | 'women' | 'children') {
    this.activeGroup = group;
    if (group === 'men') this.displayedMembers = [...this.men];
    else if (group === 'women') this.displayedMembers = [...this.women];
    else this.displayedMembers = [...this.children];

    this.searchQuery = '';
  }

  // Recherche
  onSearchChange() {
    const query = this.searchQuery.trim().toLowerCase();
    const source = this.activeGroup === 'men' ? this.men :
                   this.activeGroup === 'women' ? this.women : this.children;

    if (!query) this.displayedMembers = [...source];
    else this.displayedMembers = source.filter(m =>
      m.nom.toLowerCase().includes(query) ||
      m.prenom.toLowerCase().includes(query) ||
      m.telephone.includes(query)
    );
  }

  // PDF
  exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Membres ${this.activeGroup.toUpperCase()} - ${this.monthName}`, 14, 16);

    const tableData = this.displayedMembers.map((m, index) => [
      index + 1,
      `${m.nom} ${m.prenom}`,
      m.telephone,
      m.date_inscription,
      `${m.prix} DT`
    ]);

    autoTable(doc, {
      head: [['#', 'Nom', 'Téléphone', 'Date', 'Prix']],
      body: tableData,
      startY: 22,
    });

    doc.save(`membres_${this.activeGroup}_${this.monthName}.pdf`);
  }

  // Excel
  exportExcel() {
    const data = this.displayedMembers.map((m, index) => ({
      '#': index + 1,
      Nom: `${m.nom} ${m.prenom}`,
      Téléphone: m.telephone,
      Date: m.date_inscription,
      Prix: `${m.prix} DT`
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Membres');
    const buffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `membres_${this.activeGroup}_${this.monthName}.xlsx`);
  }

  // Actions
  viewMember(member: Member) {
    alert(`Nom: ${member.nom} ${member.prenom}\nTéléphone: ${member.telephone}\nDate: ${member.date_inscription}\nPrix: ${member.prix} DT`);
  }

  editMember(member: Member) {
    this.router.navigate(['/members/edit', member.id]);
  }

  deleteMember(member: Member) {
    if (member.id && confirm(`Voulez-vous supprimer ${member.nom} ${member.prenom} ?`)) {
      this.memberService.deleteMember(member.id).subscribe(() => {
        this.displayedMembers = this.displayedMembers.filter(m => m.id !== member.id);
        this.allMembers = this.allMembers.filter(m => m.id !== member.id);
        this.separateBySex();
      });
    }
  }

  getMonthNameAgo(monthsAgo: number = 0): string {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth() - monthsAgo, 1);
    return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  }
}
