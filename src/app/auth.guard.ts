import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    
    const isAdmin = !!localStorage.getItem('admin');

    if (isAdmin) {
      return true;
    } else {
      // Rediriger vers la page de login si l'utilisateur n'est pas connecté
      return this.router.parseUrl('/login');
    }
  }
}
