import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from './../navbar/navbar.module';
import { ViewBaseComponent } from './view-base/view-base.component';
import { ViewTitleComponent } from './view-title/view-title.component';

@NgModule({
  declarations: [ViewBaseComponent, ViewTitleComponent],
  exports: [ViewBaseComponent],
  imports: [CommonModule, NavbarModule]
})
export class ViewsModule {}