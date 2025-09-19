import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  factures: any[] = [];

  constructor(private factureService: FactureService, private router: Router) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures() {
    this.factureService.getFactures().subscribe(data => {
      this.factures = data;
    });
  }

  editFacture(id: number) {
    this.router.navigate(['/factures/edit', id]); // nécessite une route "edit"
  }

  deleteFacture(id: number) {
    if (confirm('Confirmer la suppression de cette facture ?')) {
      this.factureService.deleteFacture(id).subscribe(() => {
        this.loadFactures(); // recharge après suppression
      });
    }
  }
}
