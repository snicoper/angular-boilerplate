import { Component } from '@angular/core';
import { ThemeColor } from '../../core/constants/_index';
import { JwtTokenService } from './../../services/jwt-token.service';
import { LayoutService } from './../../services/layout.service';
import { ThemeService } from './../../services/theme.service';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(
    private layoutService: LayoutService,
    private jwtTokenService: JwtTokenService,
    private themeService: ThemeService
  ) {}

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

  handleChangeThemeColor(): void {
    const color = this.themeService.themeValue === ThemeColor.dark ? ThemeColor.light : ThemeColor.dark;
    this.themeService.setTheme(color);
  }
}
