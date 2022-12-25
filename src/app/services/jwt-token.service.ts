import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class JwtTokenService {
  private token: string;
  private tokenDecode: { [key: string]: any };
  private isTokenExpired: boolean;

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {
    const token = this.localStorageService.get('token') as string;
    this.setToken(token);
  }

  setToken(token: string): void {
    if (!token) {
      return;
    }

    this.clean();
    this.token = token;
    this.tokenDecode = jwtDecode(token);

    if (!this.tokenDecode || !this.tokenDecode.hasOwnProperty('exp')) {
      this.clean();

      return;
    }

    if (!this.isExpired()) {
      this.localStorageService.set('token', this.token);
    }

    this.authService.setAuthValue(true);
  }

  isExpired(): boolean {
    const expired = parseInt(this.tokenDecode['exp']);

    if (Date.now() >= expired * 1000) {
      this.clean();

      return true;
    }

    this.isTokenExpired = false;

    return this.isTokenExpired;
  }

  getToken(): string {
    return this.token;
  }

  private clean(): void {
    this.authService.setAuthValue(false);
    this.localStorageService.remove('token');
    this.token = '';
    this.tokenDecode = {};
    this.isTokenExpired = true;
  }
}
