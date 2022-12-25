import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth$ = new BehaviorSubject<boolean>(false);

  get isAuth(): Observable<boolean> {
    return this.auth$.asObservable();
  }

  get isAuthValue(): boolean {
    return this.auth$.getValue();
  }

  setAuthValue(value: boolean): void {
    this.auth$.next(value);
  }
}
