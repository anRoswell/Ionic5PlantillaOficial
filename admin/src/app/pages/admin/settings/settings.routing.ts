import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';

import { AdminComponent } from '../admin.component';

import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      { path: 'configuraciones/usuarios', component: UsersComponent },
      { path: 'configuraciones/usuario', component: UserFormComponent },
      { path: 'configuraciones/usuario/:id', component: UserFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
