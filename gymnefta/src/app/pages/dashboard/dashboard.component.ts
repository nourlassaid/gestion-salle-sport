import { Component, OnInit } from '@angular/core';
import { StatsService, Stats, MonthlySexStat } from '../../services/stats.service';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: Stats = {
    totalMembres: 0, totalCoachs: 0,
    totalMale: 0,
    totalFemale: 0
  };
  monthlySexStats: MonthlySexStat[] = [];

  chartData: ChartData<'line'> = { labels: [], datasets: [] };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadGlobalStats();
    this.loadMonthlySexStats();
  }

  loadGlobalStats() {
    this.statsService.getGlobalStats().subscribe({
      next: data => this.stats = data,
      error: err => console.error(err)
    });
  }

  loadMonthlySexStats() {
    this.statsService.getMonthlySexStats().subscribe({
      next: data => {
        this.monthlySexStats = data;
        this.chartData = {
          labels: data.map(stat => this.formatMonth(stat.month)),
          datasets: [
            {
              label: 'Hommes',
              data: data.map(stat => stat.totalMale || 0),
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.3)',
              fill: true,
              tension: 0.3
            },
            {
              label: 'Femmes',
              data: data.map(stat => stat.totalFemale || 0),
              borderColor: '#db2777',
              backgroundColor: 'rgba(219, 39, 119, 0.3)',
              fill: true,
              tension: 0.3
            }
          ]
        };
      },
      error: err => console.error(err)
    });
  }

  formatMonth(month: string): string {
    const [year, monthNum] = month.split('-');
    const date = new Date(Number(year), Number(monthNum) - 1);
    return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  }
}
