import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeColor } from '../core/constants/theme-color';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme$ = new BehaviorSubject<ThemeColor>(ThemeColor.auto);

  constructor(private localStorageService: LocalStorageService) {
    const colorStorage = (this.localStorageService.get('theme') as ThemeColor) || ThemeColor.auto;
    this.setTheme(colorStorage);
  }

  get theme(): Observable<ThemeColor> {
    return this.theme$.asObservable();
  }

  get themeValue(): ThemeColor {
    return this.theme$.getValue();
  }

  setTheme(theme: ThemeColor): void {
    this.localStorageService.set('theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    this.theme$.next(theme);
  }
}
