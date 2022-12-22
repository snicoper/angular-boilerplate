import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from './../../../services/layout.service';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private navbarValue = false;
  private sidebarValue = false;
  private footerValue = false;

  constructor(private layoutService: LayoutService) {
    // Save current values.
    this.navbarValue = this.layoutService.showSidebarValue;
    this.sidebarValue = this.layoutService.showSidebarValue;
    this.footerValue = this.layoutService.showFooterValue;

    this.layoutService.setValueNavbar(false);
    this.layoutService.setValueSidebar(false);
    this.layoutService.setValueFooter(false);
  }

  ngOnDestroy(): void {
    // Restore old values.
    this.layoutService.setValueNavbar(this.navbarValue);
    this.layoutService.setValueSidebar(this.sidebarValue);
    this.layoutService.setValueFooter(this.footerValue);
  }
}
