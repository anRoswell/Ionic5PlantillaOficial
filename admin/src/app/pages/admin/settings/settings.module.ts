import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';

@NgModule({
  declarations: [UsersComponent, UserFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class SettingsModule {}
