import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ILogin, ILoginResponse } from '../../../shared/interfaces';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl = `${environment.apiUrl}/auth`;

  userLogged = signal<any>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private localStorageService: LocalStorageService
  ) { }

  login(user: ILogin): Observable<any> {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, user).pipe(
      map((res) => {
        if (res?.access_token && res?.user) {
          this.localStorageService.set(environment.tokenName, res?.access_token);
          this.userLogged.set(res?.user)
          console.log(this.userLogged());

          return { ok: true };
        } else return { ok: false };
      })
    );
  }

  check() {
    return this.localStorageService.has(environment.tokenName) && !!this.userLogged();
  }

  logout() {
    this.localStorageService.clear();
    this.userLogged.set(null)
    this.router.navigateByUrl('/login');
}
}
