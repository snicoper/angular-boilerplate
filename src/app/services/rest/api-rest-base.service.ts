import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appEnvironments } from '../../core/config/app-environments';

@Injectable({ providedIn: 'root' })
export abstract class ApiRestBaseService {
  protected baseUrl: string;

  constructor(protected http: HttpClient) {
    this.baseUrl = appEnvironments.baseApiUrl;
  }

  /**
   * Obtener un item por su Id.
   *
   * @param urlPart Parte de la url base a concatenar.
   */
  get<TEntity>(urlPart = ''): Observable<TEntity> {
    urlPart = urlPart.length > 0 ? `/${urlPart}` : '';
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.get<TEntity>(url);
  }

  /**
   * Crea un nuevo item de TEntity.
   *
   * @param entity Tipo entidad.
   * @param urlPart Parte de la url base a concatenar.
   * @returns TEntity creado.
   */
  post<TEntity>(entity: TEntity, urlPart = ''): Observable<TEntity> {
    urlPart = urlPart.length > 0 ? `/${urlPart}` : '';
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.post<TEntity>(url, entity);
  }
}
