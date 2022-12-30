import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ValidationErrors } from '../constants/_index';

/**
 * Comprueba si ha habido errores en la respuesta http y en caso de haberlos,
 * mostrara los errores en un toast.
 * Solo mostrara los 400 con nonFieldErrors.
 *
 * @param errors Errores obtenidos de una consulta a la API.
 * @param toastrService Servicio para mostrar los errores.
 */
export const toastForNonFieldErrors = (errors: HttpErrorResponse, toastrService: ToastrService): void => {
  if (errors.status === HttpStatusCode.BadRequest && ValidationErrors.nonFieldErrors in errors.error.errors) {
    errors.error.errors.nonFieldErrors.forEach((error: string) => {
      toastrService.error(error);
    });
  }
};

/**
 * Comprueba si ha habido errores en la respuesta http y * en caso de haberlos,
 * mostrara los errores en un toast.
 * Solo mostrara los 400 con notificationErrors.
 *
 * @param errors Errores obtenidos de una consulta a la API.
 * @param toastrService Servicio para mostrar los errores.
 */
export const toastForNotificationErrors = (errors: HttpErrorResponse, toastrService: ToastrService): void => {
  if (errors.status === HttpStatusCode.BadRequest && ValidationErrors.notificationErrors in errors.error.errors) {
    errors.error.errors.notificationErrors.forEach((error: string) => {
      toastrService.error(error);
    });
  }
};
