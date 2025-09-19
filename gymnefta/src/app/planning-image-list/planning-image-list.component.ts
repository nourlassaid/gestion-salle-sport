import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planning-image-list',
  templateUrl: './planning-image-list.component.html',
  styleUrls: ['./planning-image-list.component.css'] // si tu veux styliser séparément
})
export class PlanningImageListComponent implements OnInit {
  images: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<string[]>('http://localhost:3000/api/planning/images')
      .subscribe(data => {
        this.images = data;
      }, error => {
        console.error('Erreur lors du chargement des plannings', error);
      });
  }
}
