import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  constructor(private socket: Socket) {
    this.socketMsg();
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessagePqrs() {
    return this.socket.fromEvent('pqr:New').pipe(map((data) => data));
  }

  getMessageSolicitarStickers() {
    return this.socket
      .fromEvent('solicitudSticker:New')
      .pipe(map((data) => data));
  }

  getMessagePayReport() {
    return this.socket.fromEvent('payReport:New').pipe(map((data) => data));
  }

  socketMsg() {
    this.socket.on('error', (e) => {
      console.log(e);
    });

    this.socket.on('chat:message', (data) => {
      console.log(data);
    });

    this.socket.on('chat:typing', (data) => {
      console.log(data);
    });

    this.socket.on('disconnect', (message) => {
      console.log(message);
    });

    this.socket.on('error', (err) => {
      console.log(err);
    });

    this.socket.on('newConexion', (err) => {
      console.log(err);
    });

    this.socket.on('nroConexiones', (cantidad) => {
      console.log(cantidad);
    });
  }
}
