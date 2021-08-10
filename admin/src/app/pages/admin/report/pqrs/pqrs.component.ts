import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { SocketIOService } from './../../../../services/socket-io.service';

import { IPqrs } from 'src/app/models/pqr.model';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styles: [],
})
export class PqrsComponent implements OnInit {
  public data = [];
  public pqrsNews: IPqrs[];
  public pqrsInProcess: IPqrs[];
  public pqrsFinish: IPqrs[];
  public badgesNew = 0;
  public badgesInProcess = 0;
  public badgesFinish = 0;

  constructor(
    private apiService: ApiService,
    private storage: StorageService,
    private route: Router,
    private socketIOService: SocketIOService
  ) {
    this.getDataSocketIO();
  }

  ngOnInit() {
    this.getPqrs();
  }

  getPqrs() {
    this.apiService.all('/pqrAdminMsSql').subscribe((pqrs) => {
      this.pqrsNews = pqrs.body.filter((item: any) => item.state === 1);
      this.badgesNew = this.pqrsNews.length;

      this.pqrsInProcess = pqrs.body.filter((item: any) => item.state === 2);
      this.badgesInProcess = this.pqrsInProcess.length;

      this.pqrsFinish = pqrs.body.filter((item: any) => item.state === 3);
      this.badgesFinish = this.pqrsFinish.length;
    });
  }

  goToListPqr(pqr: any) {
    this.storage.save('__pqr', pqr);
    this.route.navigate(['/admin/reportes/pqr', pqr.id]);
  }

  getDataSocketIO() {
    this.socketIOService.getMessagePqrs().subscribe((msgs: IPqrs) => {
      const {
        createdAt,
        cuentaId,
        description,
        id,
        observacion,
        opcionespqrId,
        state,
        updatedAt,
        userId,
        socket,
      } = msgs;
      const pqr = {
        createdAt,
        cuentaId,
        description,
        id,
        observacion,
        opcionespqrId,
        state,
        updatedAt,
        userId,
        socket,
      };
      this.pqrsNews.unshift(pqr);
    });
  }
}
