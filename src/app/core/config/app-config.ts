import { Injectable } from '@angular/core';
import { ThemeService } from './../../services/theme.service';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  constructor(private themeService: ThemeService) {
    this.themeService.initialize();
  }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
