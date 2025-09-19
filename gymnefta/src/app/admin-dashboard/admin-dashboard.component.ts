import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, Notification } from '../notification.service';
import { AuthService, AdminUser } from '../auth.service';
import { StatsService, Stats, MonthlySexStat } from '../services/stats.service';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  showUserMenu = false;
  showNotifications = false;
  notifications: Notification[] = [];
  adminUser: AdminUser | null = null;

  stats: Stats = { totalMembres: 0, totalCoachs: 0, totalMale: 0, totalFemale: 0 };
  monthlySexStats: MonthlySexStat[] = [];

  lineChartLabels: string[] = [];
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.loadAdminUser();
    if (!this.authService.isLoggedIn()) this.router.navigate(['/admin/login']);
    this.loadNotifications();
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getGlobalStats().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error(err)
    });

    this.statsService.getMonthlySexStats().subscribe({
      next: (data) => {
        this.monthlySexStats = data;
        this.lineChartLabels = data.map(d => this.formatMonth(d.month));
        const hommes = data.map(d => d.totalMale || 0);
        const femmes = data.map(d => d.totalFemale || 0);
        const total = hommes.map((h, i) => h + femmes[i]);

        this.lineChartData = {
          labels: this.lineChartLabels,
          datasets: [
            { data: hommes, label: 'Hommes', borderColor: '#4F46E5', backgroundColor: 'rgba(79,70,229,0.2)', fill: true },
            { data: femmes, label: 'Femmes', borderColor: '#EC4899', backgroundColor: 'rgba(236,72,153,0.2)', fill: true },
            { data: total, label: 'Total', borderColor: '#22C55E', backgroundColor: 'rgba(34,197,94,0.2)', borderDash: [5,5], fill: false }
          ]
        };
      },
      error: (err) => console.error(err)
    });
  }

  formatMonth(month: string): string {
    const [year, monthNum] = month.split('-');
    const date = new Date(Number(year), Number(monthNum) - 1);
    return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  }

  logout(): void { this.authService.logout(); this.router.navigate(['/admin']); }
  toggleUserMenu(): void { this.showUserMenu = !this.showUserMenu; }
  loadAdminUser(): void {
    const storedUser = this.authService.getCurrentUser();
    if (storedUser) this.adminUser = storedUser;
    else this.router.navigate(['/admin']);
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => this.notifications = data.map(n => ({ ...n, seen: n.statut === 'Lue' })),
      error: (err) => console.error(err)
    });
  }

toggleNotifications(): void {
  this.showNotifications = !this.showNotifications;
  if (this.showNotifications) {
    this.notificationService.markAllAsRead().subscribe(() => {
      this.notifications.forEach(n => { n.seen = true; n.statut = 'Lue'; });
    });
  }
}


  markAsRead(notif: Notification): void {
    if (!notif.seen) {
      this.notificationService.markAsRead(notif.id).subscribe(() => { notif.seen = true; notif.statut = 'Lue'; });
    }
  }

 getUnreadCount(): number {
  return this.notifications.filter(n => n.statut === 'Non lue').length;
}

}
