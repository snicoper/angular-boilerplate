import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { appEnvironments } from '../../core/config/_index';
import { SidebarService } from './../sidebar/sidebar.service';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  sidebarState: boolean;
  siteName = appEnvironments.siteName;

  private destroy$ = new Subject<void>();

  constructor(private sidebarService: SidebarService) {
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

  private eventListener(): void {
    this.sidebarService.sidebarState.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.sidebarState = result)
    });
  }
}
