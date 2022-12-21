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

  constructor(private layoutService: LayoutService) {
    this.navbarValue = this.layoutService.showSidebarValue;
    this.sidebarValue = this.layoutService.showSidebarValue;

    this.layoutService.setValueNavbar(false);
    this.layoutService.setValueSidebar(false);
  }

  ngOnDestroy(): void {
    this.layoutService.setValueNavbar(this.navbarValue);
    this.layoutService.setValueSidebar(this.sidebarValue);
  }
}
