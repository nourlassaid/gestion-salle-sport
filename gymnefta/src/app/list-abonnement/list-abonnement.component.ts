import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../abonnement.service';

@Component({
  selector: 'app-list-abonnement',
  templateUrl: './list-abonnement.component.html',
  styleUrls: ['./list-abonnement.component.css']
})
export class ListAbonnementComponent implements OnInit {
  abonnements: any[] = [];

  constructor(private abonnementService: AbonnementService) {}

  ngOnInit(): void {
    this.loadAbonnements();
  }

  loadAbonnements() {
    this.abonnementService.getAll().subscribe((data) => {
      this.abonnements = data;
    });
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet abonnement ?')) {
      this.abonnementService.delete(id).subscribe(() => {
        this.loadAbonnements();
      });
    }
  }
}
