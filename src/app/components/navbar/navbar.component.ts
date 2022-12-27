import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { appEnvironments } from '../../core/config/_index';
import { siteUrls } from './../../core/site-urls';
import { AuthService } from './../../services/auth.service';
import { JwtTokenService } from './../../services/jwt-token.service';
import { SidebarService } from './../sidebar/sidebar.service';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  isAuth = false;
  sidebarState: boolean;
  siteName = appEnvironments.siteName;
  siteUrls = siteUrls;

  private destroy$ = new Subject<void>();

  constructor(
    private sidebarService: SidebarService,
    private jwtTokenService: JwtTokenService,
    private authService: AuthService
  ) {
    this.sidebarState = this.sidebarService.sidebarStateValue;
    this.eventListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebarState(): void {
    this.sidebarService.toggle();
  }

  logOut(): void {
    this.jwtTokenService.clean();
  }

  private eventListener(): void {
    this.sidebarService.sidebarState.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.sidebarState = result)
    });

    this.authService.isAuth.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.isAuth = result)
    });
  }
}
