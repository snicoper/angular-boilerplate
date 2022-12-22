import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwViewsModule } from '../../components/views/aw-views.module';
import { AwCardsModule } from './../../components/cards/aw-cards.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, AwViewsModule, AwCardsModule]
})
export class AuthModule {}
