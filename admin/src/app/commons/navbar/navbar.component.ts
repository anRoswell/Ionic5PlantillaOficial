import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  public menus: any;
  public user: any;
  constructor(private auth: AuthService, private storage: StorageService) {}

  ngOnInit(): void {
    this.menus = this.auth.userMenu();
    this.user = this.storage.read('_user');
  }

  logout(): boolean {
    return this.auth.logout();
  }
}
