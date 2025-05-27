import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.authService.login({ username, password }).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('admin', 'true');
        this.router.navigate(['/admindashboard']);
      },
      error: () => {
        this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect';
      }
    });
  }
}
