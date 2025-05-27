import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  monthlySexStats: any[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.getGlobalStats();
    this.getMonthlySexStats();
  }

  getGlobalStats(): void {
    this.statsService.getGlobalStats().subscribe({
      next: data => this.stats = data,
      error: err => console.error('Erreur stats globales:', err)
    });
  }

  getMonthlySexStats(): void {
    this.statsService.getMonthlyMemberStats().subscribe({
      next: data => this.monthlySexStats = data,
      error: err => console.error('Erreur stats par sexe:', err)
    });
  }
}
