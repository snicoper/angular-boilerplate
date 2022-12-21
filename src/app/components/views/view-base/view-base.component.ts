import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-view-base',
  templateUrl: './view-base.component.html'
})
export class ViewBaseComponent {
  @Input() cssContent = 'container-fluid';
  @Input() showPageTitle = true;
  @Input() pageTitle = '';
}
