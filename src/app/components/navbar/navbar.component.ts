import { Component } from '@angular/core';
import { appEnvironments } from '../../core/config/_index';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public siteName = appEnvironments.siteName;
}
