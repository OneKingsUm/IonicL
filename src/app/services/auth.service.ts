import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthToken } from '../interfaces/auth-token';
import { Profile } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(tokens => this.saveToken(tokens)),
      catchError(error => {
        console.error('Error en el inicio de sesión', error);
        return throwError(error);
      })
    );
  }

  saveToken(tokens: AuthToken): void {
    localStorage.setItem('accessToken', tokens.access_token);
    localStorage.setItem('refreshToken', tokens.refresh_token);
  }

  getToken(): { accessToken: string | null, refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    };
  }

  isAuthenticated(): boolean {
    const accessToken = this.getToken().accessToken;
    return !!accessToken;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getUserProfile(): Observable<any> {
    return this.http.get<Profile>(`${this.apiUrl}/auth/profile`);
  }

  refreshToken(): Observable<AuthToken> {
    const refreshToken = this.getToken().refreshToken;
    return this.http.post<AuthToken>(`${this.apiUrl}/auth/refresh-token`, { refreshToken }).pipe(
      tap(tokens => this.saveToken(tokens)),
      catchError(error => {
        console.error('Error al renovar el token', error);
        return throwError(error);
      })
    );
  }
}
