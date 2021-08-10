import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular'
import { Location } from '@angular/common'

import { ConfirmPasswordValidator } from './confirm-password.validator'
import { HttpService } from './../../../services/http.service'
import { AuthenticateService } from './../../../services/authenticate.service'

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.page.html',
	styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
	usuarioName: string
	userData: any = {}
	paso1 = true
	paso2 = false
	paso3 = false
	codVerificacion: number
	formUno: FormGroup
	formDos: FormGroup
	formTres: FormGroup
	wrongCodVerificacion: string
	idUser: number

	validationsMessage = {
		emailRecovery: [
			{
				type: 'required',
				message: 'El e-mail es requerido',
			},
			{
				type: 'email',
				message: 'Digite por favor un email valido',
			},
		],
		codVerficacion: [
			{
				type: 'required',
				message: 'El nombre es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 2 caracteres para el codVerficacion',
			},
		],
		password: [
			{
				type: 'required',
				message: 'El Password es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 8 caracteres para el password',
			},
		],
		confirmPassword: [
			{
				type: 'required',
				message: 'Confirmacion password es requerida',
			},
			{
				type: 'minlength',
				message: 'Minimo 8 caracteres para la contraseña',
			},
		],
	}

	constructor(
		private fb: FormBuilder,
		private auth: AuthenticateService,
		public alertController: AlertController,
		private router: Router,
		private httpService: HttpService,
		private location: Location,
	) {
		this.formUno = this.fb.group({
			emailRecovery: ['', [Validators.required, Validators.email]],
		})

		this.formDos = this.fb.group({
			codVerficacion: ['', [Validators.required, Validators.minLength(2)]],
		})

		this.formTres = this.fb.group(
			{
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
			},
			{ validator: ConfirmPasswordValidator.MatchPassword },
		)
	}

	async ngOnInit() {}

	RecoveryPasswordMail(dataForm1: any) {
		this.httpService.Post({ emailRecovery: dataForm1.emailRecovery }, `auth/recoverypass`).subscribe((resp) => {
			this.codVerificacion = resp.body.codVerificacion
			this.idUser = resp.body.id
			this.paso1 = false
			this.paso2 = true
			this.paso3 = false
		})
	}

	compareCodVerificacion(codVer: any) {
		if (parseInt(codVer.codVerficacion, 10) !== this.codVerificacion) {
			this.wrongCodVerificacion = `Codigo incorrecto por favor verificar!!!`
		} else {
			this.wrongCodVerificacion = ''
			this.paso1 = false
			this.paso2 = false
			this.paso3 = true
		}
	}

	/**
	 * Actualizamos password
	 * @param dataFormTres Obtenemos datos del formulario numero tres
	 */
	updatePassword(dataFormTres: any) {
		this.auth.updatePassword(this.idUser, btoa(dataFormTres.password)).subscribe(
			(resp) => {
				this.presentAlert()
			},
			(error) => console.log(error),
		)
	}

	noRecibistesCodigo() {}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValidUno(field: string, validationType: string) {
		const f = this.formUno.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValidDos(field: string, validationType: string) {
		const f = this.formDos.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValidTres(field: string, validationType: string) {
		const f = this.formTres.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	async presentAlert() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Actualizción de contraseña',
			message: '<strong>Exitosa.</strong>',
			buttons: [
				{
					text: 'OK',
					handler: () => {
						this.router.navigate(['/login'])
					},
				},
			],
		})
		await alert.present()
	}

	goBack() {
		this.location.back()
	}
}
