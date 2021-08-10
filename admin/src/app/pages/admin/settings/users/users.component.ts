import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  public data: any;
  public user: any;
  public isLoading: boolean;
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router,
    private loading: LoadingService
  ) {
    this.loading.isLoading.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  ngOnInit(): void {
    this.api.all('users').subscribe((users) => {
      console.log(users);
      this.data = users;
    });
    this.api.all('profiles').subscribe((profiles) => {
      console.log(profiles);
      this.storage.save('__profiles', profiles);
    });
    this.storage.destroy('__user');
  }

  setUser(user: any): void {
    this.user = user;
  }

  goToUser(user: any): void {
    this.storage.save('__user', user);
    this.router.navigate(['/admin/configuraciones/usuario', user.id]);
  }

  delete(id: number): void {
    this.api.delete(`users/${id}`).subscribe((response) => {
      this.data.map((item) => {
        if (item.id === id) {
          item.status = 0;
        }
      });
    });
  }
}
