import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'aw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  sidebarState: boolean;

  private destroy$ = new Subject<void>();

  constructor(private sidebarService: SidebarService) {
    this.sidebarState = sidebarService.sidebarStateValue;

    this.eventListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleClick(): void {
    this.sidebarService.toggle();
  }

  private eventListener(): void {
    this.sidebarService.sidebarState.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.sidebarState = result)
    });
  }
}
