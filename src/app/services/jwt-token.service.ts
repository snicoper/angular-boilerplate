import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class JwtTokenService {
  private token: string;
  private tokenDecode: { [key: string]: any };
  private isTokenExpired: boolean;
  private auth$ = new BehaviorSubject<boolean>(false);

  constructor(private localStorageService: LocalStorageService) {
    const token = this.localStorageService.get('token') as string;
    this.setToken(token);
  }

  get isAuth(): Observable<boolean> {
    return this.auth$.asObservable();
  }

  get isAuthValue(): boolean {
    return this.auth$.getValue();
  }

  setAuthValue(value: boolean): void {
    this.auth$.next(value);
  }

  setToken(token: string): void {
    if (!token) {
      return;
    }

    this.logOut();
    this.token = token;
    this.tokenDecode = jwtDecode(token);

    if (!this.tokenDecode || !this.tokenDecode.hasOwnProperty('exp')) {
      this.logOut();

      return;
    }

    if (!this.isExpired()) {
      this.localStorageService.set('token', this.token);
    }

    this.setAuthValue(true);
  }

  isExpired(): boolean {
    const expired = parseInt(this.tokenDecode['exp']);

    if (Date.now() >= expired * 1000) {
      this.logOut();

      return true;
    }

    this.isTokenExpired = false;

    return this.isTokenExpired;
  }

  getToken(): string {
    return this.token && !this.isTokenExpired ? this.token : '';
  }

  logOut(): void {
    this.setAuthValue(false);
    this.localStorageService.remove('token');
    this.token = '';
    this.tokenDecode = {};
    this.isTokenExpired = true;
  }

  getRole(role: string): string[] | string | null {
    const roles = this.getRoles();
    const index = roles.indexOf(role);

    if (index >= 0) {
      return roles[index];
    }

    return null;
  }

  getRoles(): string[] {
    return this.tokenDecode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  isInRole(role: string): boolean {
    return this.getRole(role) ? true : false;
  }
}
