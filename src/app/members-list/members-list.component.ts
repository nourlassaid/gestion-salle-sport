import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import ajouté ici
import { MemberService } from '../services/member.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Member } from '../models/Member.model';


@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MembersListComponent implements OnInit {
  members: any[] = [];

  constructor(
    private memberService: MemberService,
    private router: Router // ✅ Injecté ici
  ) {}

  ngOnInit() {
    this.fetchMembers();
  }

  fetchMembers() {
    this.memberService.getMembers().subscribe(data => {
      this.members = data;
    });
  }

  view(member: any) {
    this.router.navigate(['/members/view', member.id]); // ✅ Redirection
  }

  edit(member: any) {
    // TODO: Naviguer vers la page de modification
  }

  delete(id: number) {
    if (confirm('Confirmer la suppression ?')) {
      this.memberService.deleteMember(id).subscribe(() => {
        this.fetchMembers();
      });
    }
  }

  print() {
    window.print();
  }

  exportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.members);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, 'members_list.xlsx');
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Liste des membres', 14, 16);

    const tableData = this.members.map(m => [
      `${m.nom} ${m.prenom}`,
      m.telephone,
      m.date_inscription,
      `${m.prix} DT`
    ]);

    autoTable(doc, {
      head: [['Nom', 'Téléphone', 'Date', 'Prix']],
      body: tableData,
      startY: 22,
    });

    doc.save('members_list.pdf');
  }
}
