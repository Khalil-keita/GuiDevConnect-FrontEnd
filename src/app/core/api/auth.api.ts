import { API_ENDPOINT } from './../../../../env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { ApiResponse, ErrorResponse } from '../models/apiResponse';
import { AuthData } from '../models/authData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {

  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private authUrl: string = `${API_ENDPOINT}/auth`;
  private readonly SESSION_KEY = "__session__";
  private readonly authDataSubject = new BehaviorSubject<AuthData | null>(null)
  private refreshTimeout: any;

  public authData$ = this.authDataSubject.asObservable();

  public login(creadentials: Credentials): Observable<ApiResponse<AuthData>> {
    return this.httpClient.post<ApiResponse<AuthData>>(`
      ${this.authUrl}/login`, creadentials
    ).pipe(
      tap(res => this.handleAuthSuccess(res.data as AuthData)),
      catchError(this.handleAuthError)
    )
  }

  public refreshToken(): Observable<ApiResponse<AuthData>> {
    const currentData = this.authDataSubject.value;

    if (!currentData?.refreshToken)
      return throwError(() => new Error("Aucun token de rafraîchissement disponible."));

    return this.httpClient.post<ApiResponse<AuthData>>(
      `${this.authUrl}/refresh-token`, { refreshToken: currentData.refreshToken }
    ).pipe(
      tap(res => this.handleAuthSuccess(res.data as AuthData)),
      catchError(err => {
        //Deconnexion en cas d'erreur de rafraîchissement
        this.logout()
        return this.handleAuthError(err);
      })
    )
  }


  public logout(): void {
    const currentData = this.authDataSubject.value;

    if (currentData?.accessToken) {
      this.httpClient.post(`${this.authUrl}/revoke`, {}, {
        headers: { Authorization: `Bearer ${currentData.accessToken}` }
      }).subscribe();
    }

    this.clearAuthData();
    this.router.navigate(['/login']);
  }


  private clearAuthData() {
    localStorage.removeItem(this.SESSION_KEY);
    this.authDataSubject.next(null);
    clearTimeout(this.refreshTimeout);
  }


  private handleAuthError(err: HttpErrorResponse): Observable<never> {
    let errorResponse: ErrorResponse;

    if (err.error instanceof ErrorEvent) {
      // Erreur client
      errorResponse = {
        status: 0,
        message: "Erreur reseau ou client"
      }
    } else {
      // Erreur serveur
      errorResponse = {
        status: err.status,
        message: err.message,
        errors: err.error?.errors,
        timestamp: err.error?.timestamp
      }
    };

    // Messages spécifiques selon le code d'erreur
    switch (err.status) {
      case 400:
        errorResponse.message = "Réquête invalide.";
        break;
      case 401:
        errorResponse.message = "Non autorisé.";
        break;
      case 403:
        errorResponse.message = "Accès refusé.";
        break;
      case 429:
        errorResponse.message = "Trop de tentatives. Réessayer plus tard";
        break;
    }

    return throwError(() => errorResponse);
  }


  private handleAuthSuccess(data: AuthData): void {
    //Calculer l'expiration basées sur le token
    //const docodedToken = this.jwtHelper.decodeToken(data?.accessToken);
    let decodedToken: any;
    data.expiresAt = decodedToken.exp * 1000

    // Stocker les données
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(data))
    this.authDataSubject.next(data);

    // Planifier le refraîchissement automatique
    this.scheduleTokenRefresh(data?.expiresAt as number)
  }

  private scheduleTokenRefresh(expiresAt: number): void {
    const refreshTime = expiresAt - Date.now() - 300000 //5 min avant expiration

    clearTimeout(this.refreshTimeout);

    if (refreshTime > 0) {
      this.refreshTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, refreshTime)
    } else {
      //Rafraîchir imméditement si le token expire bientôt
      this.refreshToken();
    }
  }

  // Méthodes utilitaires
  public isAuthenticated(): boolean {
    return !!this.authDataSubject.value;
  }

  public getCurrentUserId(): string | null {
    return this.authDataSubject.value?.userId || null;
  }

  public getAccessToken(): string | null {
    return this.authDataSubject.value?.accessToken || null;
  }

}
