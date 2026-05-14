import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      let message = 'Error inesperado';

      if (error.status === 0)    message = 'No se pudo conectar al servidor';
      if (error.status === 400)  message = error.error?.message || 'Solicitud inválida';
      if (error.status === 404)  message = 'Recurso no encontrado';
      if (error.status === 500)  message = 'Error interno del servidor';

      console.error(`[HTTP ${error.status}]`, message);
      return throwError(() => ({ status: error.status, message }));
    })
  );
};