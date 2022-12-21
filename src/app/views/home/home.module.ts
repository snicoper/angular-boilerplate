import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewsModule } from './../../components/views/views.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ViewsModule]
})
export class HomeModule {}
