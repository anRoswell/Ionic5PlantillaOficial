import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { StorageService } from './storage.service';
import { ILogin } from '../models/login.model';
import { IUserLogin } from './../models/user-login.model';
import { environment } from './../../environments/environment';
import { tap, retry, catchError } from 'rxjs/operators';

const { server, api } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {}

  login(login: ILogin): Observable<IUserLogin> {
    // TODO: Implementar seguridad al enviar datos de usuario.
    return this.http.post<IUserLogin>(`${server}${api}/AdminAuth`, login);
  }

  logout(): boolean {
    this.storage.clear();
    this.router.navigate(['/login']);
    return false;
  }

  isAuth(): boolean {
    return !!(this.storage.read('_user') && this.storage.read('_token'));
  }

  userMenu(): any {
    return !!this.storage.read('_access')
      ? JSON.parse(
          decodeURIComponent(
            escape(JSON.stringify(this.storage.read('_access')))
          )
        )
      : [];
  }

  handleError(error: any) {
    console.log(`Llego aqui`);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
