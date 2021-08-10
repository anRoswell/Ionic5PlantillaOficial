import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';
import { AdminComponent } from './../admin.component';
import { PqrsComponent } from './pqrs/pqrs.component';
import { PqrFormComponent } from './pqrs/pqr-form.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      { path: 'reportes/pqrs', component: PqrsComponent },
      { path: 'reportes/pqr/:id', component: PqrFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
