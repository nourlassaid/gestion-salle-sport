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
  members: Member[] = [];
  allMembers: Member[] = [];
  searchQuery: string = '';

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

  loadMembersForMonth(month: string) {
    this.memberService.getMembers().subscribe(data => {
      this.allMembers = this.groupMembersByMonth(data)[month] || [];
      this.members = [...this.allMembers];
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

  exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Membres de ${this.monthName}`, 14, 16);

    const tableData = this.members.map((m, index) => [
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

    doc.save(`membres_${this.monthName}.pdf`);
  }

  exportExcel() {
    const dataWithIndex = this.members.map((m, index) => ({
      '#': index + 1,
      Nom: `${m.nom} ${m.prenom}`,
      Téléphone: m.telephone,
      Date: m.date_inscription,
      Prix: `${m.prix} DT`
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataWithIndex);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Membres');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, `membres_${this.monthName}.xlsx`);
  }

  onSearchChange() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query === '') {
      this.members = [...this.allMembers];
    } else {
      this.members = this.allMembers.filter(m =>
        m.nom.toLowerCase().includes(query) ||
        m.prenom.toLowerCase().includes(query) ||
        m.telephone.includes(query)
      );
    }
  }

  viewMember(member: Member) {
    alert(`Informations du membre:\n\nNom: ${member.nom} ${member.prenom}\nTéléphone: ${member.telephone}\nDate: ${member.date_inscription}\nPrix: ${member.prix} DT`);
  }

  editMember(member: Member) {
    this.router.navigate(['/members/edit', member.id]);
  }

  deleteMember(member: Member) {
    if (member.id !== undefined && confirm(`Êtes-vous sûr de vouloir supprimer ${member.nom} ${member.prenom} ?`)) {
      this.memberService.deleteMember(member.id).subscribe(() => {
        this.members = this.members.filter(m => m.id !== member.id);
        this.allMembers = this.allMembers.filter(m => m.id !== member.id);
      });
    }
  }
}
