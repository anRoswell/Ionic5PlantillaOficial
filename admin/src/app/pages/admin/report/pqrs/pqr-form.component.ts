import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageService } from './../../../../services/storage.service';
import { ApiService } from './../../../../services/api.service';

@Component({
  selector: 'app-pqr-form',
  templateUrl: './pqr-form.component.html',
  styles: [],
})
export class PqrFormComponent implements OnInit {
  public form: FormGroup;
  public id: number;
  public title: string;
  public gestion = false;
  public historical: any;
  public stateFinish = false;
  public btStateResponse = true;
  public imgs: any;
  public showSlider = false;
  public imageObject = [];
  public badgesImg;
  public badgesHistory;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private storage: StorageService,
    private apiService: ApiService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      userId: [{ value: '', disabled: true }, Validators.required],
      cuentaId: [{ value: '', disabled: true }, Validators.required],
      opcionespqrId: [{ value: '', disabled: true }, Validators.required],
      description: [{ value: '', disabled: true }],
      observacion: [{ value: '', disabled: true }, Validators.required],
      createdAt: [{ value: '', disabled: true }, Validators.required],
      observation: ['', Validators.required],
    });

    // this.form.disable();

    if (id) {
      this.title = 'Responder Pqr';
      this.id = Number(id);
      this.getHistoryById();
      this.getImagesById();
      const {
        userId,
        cuentaId,
        opcionespqrId,
        observacion,
        state,
        createdAt,
        description,
      } = this.storage.read('__pqr');
      this.form.patchValue({
        userId,
        cuentaId,
        opcionespqrId,
        observacion,
        description,
        createdAt,
      });
      if (state === 2) {
        this.stateFinish = !this.stateFinish;
      }
      if (state === 3) {
        this.btStateResponse = !this.btStateResponse;
      }
    }
  }

  ngOnInit(): void {}

  /**
   * Valida si mostrar o no TextArea para la observación
   */
  gestionar() {
    this.gestion = !this.gestion;
  }

  /**
   * Guarda observación realizada a la Pqr
   */
  save() {
    console.log(this.form.value);
    const data = this.form.value;
    data.id = this.id;
    data.state = 2;
    this.apiService.update(`/pqrAdminMsSql/${this.id}`, data).subscribe(
      (rta) => {
        this.router.navigateByUrl('/admin/reportes/pqrs');
      },
      (err) => console.log(err)
    );
  }

  /**
   * Obtenemos el historial de la Pqr seleccionada
   */
  getHistoryById() {
    this.apiService.ById(`pqrAdminMsSql/${this.id}`).subscribe(
      (rta) => {
        this.historical = rta.body;
        this.badgesHistory = rta.body.length;
      },
      (err) => console.log(err)
    );
  }

  /**
   * Obtenemos las imagenes cargadas por el usuario.
   */
  getImagesById() {
    this.apiService.ById(`pqrImgAdminMsSql/${this.id}`).subscribe(
      (rta) => {
        this.badgesImg = rta.body.length;
        if (rta.body.length > 0) {
          this.showSlider = !this.showSlider;
          this.imgs = rta.body.map((img: any) => {
            const imagen = {
              image: img.image,
              thumbImage: img.image,
              title: '',
            };
            this.imageObject.push(imagen);
          });
        }
      },
      (err) => console.log(err)
    );
  }

  /**
   * Finaliza proceso de Pqr
   */
  finalizar() {
    console.log(`Se finaliza proceso.`);
    const data = {
      state: 3,
      observation: 'Finaliza proceso.',
    };
    this.apiService.update(`pqrAdminMsSql/${this.id}`, data).subscribe(
      (rta) => {
        document.getElementById('closeModalButton').click();
        this.router.navigateByUrl('/admin/reportes/pqrs');
      },
      (err) => console.log(err)
    );
  }
}
