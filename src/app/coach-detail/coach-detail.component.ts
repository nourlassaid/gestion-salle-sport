import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachService } from '../coach.service';
import { Coach } from '../models/coach.model';

@Component({
  selector: 'app-coach-detail',
  templateUrl: './coach-detail.component.html',
  styleUrls: ['./coach-detail.component.css']
})
export class CoachDetailComponent implements OnInit {

  coach?: Coach;

  constructor(private route: ActivatedRoute, private coachService: CoachService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.coachService.getCoachById(id).subscribe({
          next: (data) => this.coach = data,
          error: (err) => console.error('Erreur récupération coach :', err)
        });
      } else {
        console.error('L\'id dans l\'URL n\'est pas un nombre valide');
      }
    } else {
      console.error('ID manquant dans l\'URL');
    }
  }
}
