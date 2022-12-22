import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwCardsModule } from './../../components/cards/aw-cards.module';
import { ViewsModule } from './../../components/views/views.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, ViewsModule, AwCardsModule]
})
export class AuthModule {}
