import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewsModule } from './../../components/views/views.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ViewsModule]
})
export class AuthModule {}
