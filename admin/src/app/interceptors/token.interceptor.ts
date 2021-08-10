import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, share, map } from 'rxjs/operators';

import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { MessageService } from './../services/message.service';
import { IMessage } from '../models/message.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private msg: IMessage = null;

  constructor(
    private storage: StorageService,
    private auth: AuthService,
    private message: MessageService
  ) {
    this.msg = { type: '', message: '' };
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return of(this.storage.read('_token')).pipe(
      switchMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
        }
        return next.handle(request).pipe(
          share(),
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // Verificación del token del usuario
              token = event.headers.get('authorization');
              if (token) {
                this.storage.save('_token', token);
              }
            }

            // Proceso para mostrar los mensaje en las acciones CRUD
            // const {
            //   body: { action },
            // } = event;
            const action = 'created';
            if (action) {
              this.msg.type = 'success';
              if (action === 'created') {
                this.msg.message = 'Registro creado con éxito';
              } else if (action === 'updated') {
                this.msg.message = 'Registro actualizado con éxito';
              } else if (action === 'deleted') {
                this.msg.message = 'Registro eliminado con éxito';
              }
              console.log(this.msg);
              this.message.dispatch.next(this.msg);
            }

            // Proceso para mostrar los mensaje de error
            if (event instanceof HttpErrorResponse) {
              const { status, error } = event;
              // Validación de usuario sin acceso al backend
              if ([401, 403].includes(status)) {
                this.auth.logout();
              }
              // Validación mensaje de error
              if (!status) {
                this.msg.type = 'error';
                this.msg.message = 'Error de conexión al servidor';
              } else {
                this.msg = error;
              }
              this.message.dispatch.next(this.msg);
            }

            return event;
          })
        );
      })
    );
  }
}
