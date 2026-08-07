import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const roles = route.data['roles'];

    if (!roles)
      return true;

    const userRoles = this.authService.getRoles();

    const hasRole = roles.some(
      (r: string) => userRoles.includes(r)
    );

    if (!hasRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    
    return true;

  }
}