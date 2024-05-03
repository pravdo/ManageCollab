import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        console.log('Unauthorized request');
      }
      const e = err.error.message | err.statusText;
      return throwError(() => err);
    })
  );
};
