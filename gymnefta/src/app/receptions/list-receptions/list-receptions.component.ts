import { Component, OnInit } from '@angular/core';
import { ReceptionService, Receptionniste } from '../../reception.service';

@Component({
  selector: 'app-list-receptions',
  templateUrl: './list-receptions.component.html'
})
export class ListReceptionsComponent implements OnInit {
  receptionnistes: Receptionniste[] = [];

  constructor(private receptionService: ReceptionService) {}

  ngOnInit(): void {
    this.loadReceptionnistes();
  }

  loadReceptionnistes(): void {
    this.receptionService.getReceptionnistes().subscribe((data) => {
      this.receptionnistes = data;
    });
  }

  delete(id: number): void {
    if (confirm('Supprimer cette réceptionniste ?')) {
      this.receptionService.deleteReceptionniste(id).subscribe(() => {
        this.receptionnistes = this.receptionnistes.filter(r => r.id !== id);
      });
    }
  }

  onReceptionAdded(newReception: Receptionniste): void {
    this.receptionnistes.push(newReception);
  }
}
