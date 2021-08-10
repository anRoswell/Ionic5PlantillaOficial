import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';

import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit {
  public showPass = false;
  public form: FormGroup;
  public id: number;
  public title: string;
  public profiles: any;
  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'El email es requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 5 caracteres para el email',
      },
    ],
  };
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: StorageService,
    private api: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(10)]],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        mobile: ['', [Validators.required, Validators.minLength(5)]],
        profileid: ['', Validators.required],
        status: [true],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );

    this.title = 'Nuevo Usuario';
    this.profiles = this.storage.read('__profiles');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.form.get('password').clearValidators();
      this.form.get('confirmPassword').clearValidators();
      this.showPass = false;
      this.title = 'Modificar Usuario';
      this.id = Number(id);
      const {
        name,
        username,
        email,
        mobile,
        profileid,
        status,
      } = this.storage.read('__user');

      this.form.patchValue({
        name,
        username,
        email,
        mobile,
        profileid,
        status,
      });
    } else {
      this.showPass = true;
      this.form.get('password').setValidators([Validators.required]);
      this.form.get('confirmPassword').setValidators([Validators.required]);
    }
  }

  ngOnInit(): void {}

  isValid(field: string): boolean {
    const f = this.form.get(field);
    return f.invalid && (f.dirty || f.touched);
  }

  /**
   * Guardar Usuario
   */
  save() {
    if (this.form.valid) {
      console.log(this.id);
      if (this.id) {
        this.api.update(`users/${this.id}`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/configuraciones/usuarios']);
        });
      } else {
        this.api.create(`users`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/configuraciones/usuarios']);
        });
      }
    }
  }
}
