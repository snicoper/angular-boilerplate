import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { siteUrls } from '../core/urls/_index';
import { JwtTokenService } from './../services/jwt-token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtTokenService: JwtTokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.jwtTokenService.getToken()) {
      this.router.navigate([siteUrls.login], { queryParams: { returnUrl: state.url } });

      return false;
    }

    const userRoles = this.jwtTokenService.getRoles();
    const { roles } = route.data;
    let isValid = true;

    if (!roles) {
      return true;
    }

    roles.forEach((role: string) => {
      if (!userRoles.includes(role)) {
        this.router.navigate([siteUrls.login], { queryParams: { returnUrl: state.url } });

        isValid = false;
      }
    });

    return isValid;
  }
}
