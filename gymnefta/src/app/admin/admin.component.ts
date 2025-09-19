import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['']
    });
  }

  toggleMode(event?: Event): void {
    if (event) event.preventDefault();
    this.isLogin = !this.isLogin;
    this.successMessage = '';
    this.errorMessage = '';
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid || (!this.isLogin && !this.form.value.name)) {
      this.errorMessage = 'Veuillez remplir tous les champs requis';
      return;
    }

    const data = this.form.value;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.isLogin) {
      this.http.post('http://localhost:3000/api/auth/login', {
        username: data.username,
        password: data.password
      }).subscribe({
        next: (res: any) => {
          this.successMessage = 'Connexion réussie ! Bienvenue ' + res.user.name;
          localStorage.setItem('admin', JSON.stringify(res.user));
          setTimeout(() => this.router.navigate(['/admin/dashboard']), 1000);
        },
        error: (err) => this.errorMessage = err.error?.message || 'Erreur lors de la connexion'
      });
    } else {
      this.http.post('http://localhost:3000/api/auth/register', {
        username: data.username,
        password: data.password,
        name: data.name
      }).subscribe({
        next: () => {
          this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
          setTimeout(() => this.toggleMode(), 1000);
        },
        error: (err) => this.errorMessage = err.error?.message || 'Erreur lors de l\'inscription'
      });
    }
  }
}
