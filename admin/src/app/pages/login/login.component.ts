import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ILogin } from '../../models/login.model';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: ILogin;
  public formLogin: FormGroup;
  public error: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: StorageService,
    private router: Router
  ) {
    this.error = false;
    if (this.auth.isAuth()) {
      this.router.navigate(['/admin/estadisticas/main']);
    } else {
      this.formLogin = this.fb.group({
        usrEmail: ['', Validators.required],
        usrPassword: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {}

  isInvalid(field: string): boolean {
    const f = this.formLogin.get(field);
    return f.invalid && (f.dirty || f.touched);
  }

  login() {
    if (this.formLogin.valid) {
      this.user = this.formLogin.value;
      this.user.usrPassword = btoa(this.formLogin.get('usrPassword').value);
      this.auth.login(this.user).subscribe(
        (user) => {
          const { id, name, lastDateLogin, lastIpLogin, access } = user.body;
          this.storage.save('_user', { id, name, lastDateLogin, lastIpLogin });
          this.storage.save('_access', access, true);
          this.router.navigate(['/admin/estadisticas/main']);
        },
        ({ error, status }) => {
          console.log(`${error}`);
          this.error =
            status === 0 ? { message: 'Error de conexión al servidor' } : error;
          setTimeout(() => (this.error = false), 3000);
        }
      );
    }
  }
}
