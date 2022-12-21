import { environment } from 'src/environments/environment';

/** Wrapper para obtener la configuración en base al environment. */
export const appEnvironments = {
  siteName: environment.siteName,
  apiUrl: environment.apiUrl,
  siteUrl: environment.siteUrl,
  baseApiUrl: `${environment.apiUrl}/${environment.apiSegment}`,
  isDebug: !environment.production
};
