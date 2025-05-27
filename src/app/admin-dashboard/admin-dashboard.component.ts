import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  logout() {
    // Supprimer le token ou toute autre donnée liée à l'authentification
    localStorage.removeItem('token'); // ou sessionStorage selon ton choix
    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
