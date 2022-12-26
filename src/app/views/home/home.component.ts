import { Component } from '@angular/core';
import { JwtTokenService } from './../../services/jwt-token.service';
import { LayoutService } from './../../services/layout.service';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private layoutService: LayoutService, private jwtTokenService: JwtTokenService) {}

  getUserId(): string {
    return this.jwtTokenService.getSid();
  }

  getUserName(): string {
    return this.jwtTokenService.getName();
  }

  getRoles(): string[] {
    return this.jwtTokenService.getRoles();
  }

  logOut(): void {
    this.jwtTokenService.clean(true);
  }

  handleToggleNavbar(): void {
    this.layoutService.toggleNavbar();
  }

  handleToggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  handleToggleFooter(): void {
    this.layoutService.toggleFooter();
  }
}
