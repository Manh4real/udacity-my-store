import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

import { IGNORE_AUTH, RouteConstants } from '../constants/route';
import { User } from '../models/user';

export interface LoginBody {
  user_id: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly path = RouteConstants.API_BASE_URL;
  private readonly _user$ = new BehaviorSubject<User | null>(null);

  private _token$ = new BehaviorSubject<string | null>(null);
  private readonly storageKey = 'access_token';

  get user(): User | null {
    return this._user$.getValue();
  }

  constructor(private readonly httpClient: HttpClient) {}

  setUser(user: User | null) {
    this._user$.next(user);
  }

  fetchUser$(userId: string): Observable<User | null> {
    return this.httpClient.get<User | null>(`${this.path}/users/${userId}`);
  }

  login(body: LoginBody): Observable<User | null> {
    const context = new HttpContext().set(IGNORE_AUTH, true);

    return this.httpClient
      .post<LoginResponse>(`${this.path}/auth/login`, body, { context })
      .pipe(
        tap({
          next: (res) => {
            this.setToken(res.accessToken);
          },
          error: (err) => {
            const message = err.error.message || err.error.error;

            message && alert(message);

            return of(null);
          },
        }),
        switchMap(() => this.fetchUser$(body.user_id)),
        tap((user) => this._user$.next(user))
      );
  }

  setToken(value: string | null): void {
    this._token$.next(value);

    localStorage.setItem(this.storageKey, JSON.stringify(this.getToken()));
  }

  getToken(): string | null {
    return this._token$.getValue();
  }

  getTokenFromStorage() {
    const token =
      JSON.parse(localStorage.getItem(this.storageKey) as any) || null;

    this._token$.next(token);
  }
}
