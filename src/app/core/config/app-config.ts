import { Injectable } from '@angular/core';
import { JwtTokenService } from './../../services/jwt-token.service';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  constructor(private jwtTokenService: JwtTokenService) {}

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
