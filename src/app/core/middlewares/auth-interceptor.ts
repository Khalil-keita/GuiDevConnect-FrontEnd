import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthApi } from '../api/auth.api';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

const PUBLIC_ENDPOIND = [

];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authApi: AuthApi = inject(AuthApi);

  // Ajouter le token d'accès aux réquêtes authentifiées
  if (authApi.isAuthenticated()) {
    const token = authApi.getAccessToken() as string;

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Gerer les errurs 401  (non autorisé)
      if (err.status === 401 && authApi.isAuthenticated()) {
        return handle401Error(req, next, authApi);
      }

      return throwError(() => err);
    })
  );
};


function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authApi: AuthApi): Observable<HttpEvent<any>> {
  return authApi.refreshToken().pipe(
    switchMap(() => {
      const newToken = authApi.getAccessToken() as string
      const newReq = req.clone({
        setHeaders: { Authorization: `Bearer ${newToken}` }
      });

      return next(newReq);
    }),
    catchError(refreshError => {
      // Déconnecter si le rafraîchissement échoue
      authApi.logout();
      return throwError(() => refreshError);
    })
  );
}

