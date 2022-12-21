import { Component } from '@angular/core';
import { LayoutService } from './../../services/layout.service';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private layoutService: LayoutService) {}

  handleToggleNavbar(): void {
    this.layoutService.toggleNavbar();
  }
}
