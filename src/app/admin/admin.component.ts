import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  isLogin = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      password: [''],
      name: ['']  // utilisé uniquement pour l'inscription
    });
  }

  toggleMode(event: Event): void {
    event.preventDefault();
    this.isLogin = !this.isLogin;
  }

  onSubmit(): void {
    const data = this.form.value;

    if (this.isLogin) {
      // Connexion
      this.http.post('http://localhost:3000/api/auth/login', {
        username: data.username,
        password: data.password
      }).subscribe({
        next: (res: any) => {
          alert('Connexion réussie ! Bienvenue ' + res.user.name);
          // Stocker l'utilisateur connecté
          localStorage.setItem('admin', JSON.stringify(res.user));
          // Redirection vers le dashboard
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          alert(err.error.message || 'Erreur lors de la connexion');
        }
      });
    } else {
      // Inscription
      this.http.post('http://localhost:3000/api/auth/register', {
        username: data.username,
        password: data.password,
        name: data.name
      }).subscribe({
        next: () => {
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          this.toggleMode(new Event('click'));
        },
        error: (err) => {
          alert(err.error.message || 'Erreur lors de l\'inscription');
        }
      });
    }
  }
}
