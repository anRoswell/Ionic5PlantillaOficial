import { Component } from '@angular/core'
import { Location } from '@angular/common'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { NavController, AlertController } from '@ionic/angular'

import { ConfirmPasswordValidator } from './confirm-password.validator'
import { AuthenticateService } from '../../../services/authenticate.service'
import { HttpService } from 'src/app/services/http.service'

import { EmailVerification } from '../../../Interfaces/interfaces'

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
	emailVerification: EmailVerification = {
		usrEmail: '',
		usrNames: '',
		usrLastNames: '',
	}
	customActionSheetOptions: any = {
		header: 'Seleccione su PQR',
		cssClass: 'classActionSheetPersonalize',
	}
	stateIdentificationType = {
		cedula: false,
		extranjera: false,
		pasaporte: false,
	}
	unamePattern = '^[a-zA-Z0-9-]{5,15}$'
	numericPatter = '^[0-9]{5,15}$'
	loading: any
	codigoVerificacion: number
	errorCodValidation: string
	Form: FormGroup
	errorMessage = ''
	validationsMessage = {
		usrEmail: [
			{
				type: 'required',
				message: 'El e-mail es requerido',
			},
			{
				type: 'email',
				message: 'Debe ingresar un email valido',
			},
		],
		usrPassword: [
			{
				type: 'required',
				message: 'El password es requerido',
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
		usrNames: [
			{
				type: 'required',
				message: 'El nombre completo es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 10 letras para el nombre',
			},
		],
		usrLastNames: [
			{
				type: 'required',
				message: 'El e-mail es requerido',
			},
			{
				type: 'email',
				message: 'Debe ingresar un email valido',
			},
		],
		usrNroCelular: [
			{
				type: 'required',
				message: 'El celular es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 7 numero para el celular',
			},
		],
		usrDireccion: [
			{
				type: 'required',
				message: 'La dirección es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 5 caracteres para la dirección',
			},
		],
		extDocExtranjero: [
			{
				type: 'required',
				message: 'Tipo de documento es requerido',
			},
		],
		identificationTypeId: [
			{
				type: 'required',
				message: 'Tpo de identificación es requerido',
			},
		],
	}
	constructor(
		private formBuilder: FormBuilder,
		private navCtrl: NavController,
		private authService: AuthenticateService,
		private alertController: AlertController,
		private httpservice: HttpService,
		private location: Location,
	) {
		this.Form = this.formBuilder.group(
			{
				usrNames: ['', [Validators.required, Validators.minLength(5)]],
				usrLastNames: ['', [Validators.required, Validators.minLength(5)]],
				usrNroCelular: ['', [Validators.required, Validators.minLength(5)]],
				usrTelefonoFijo: [''],
				usrEmail: ['', [Validators.required, Validators.email]],
				usrPassword: ['', [Validators.required, Validators.minLength(8)]],
				confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
				identificationTypeId: ['', [Validators.required]],
				usrCedula: ['', [Validators.required, Validators.minLength(6)]],
				usrDireccion: ['', [Validators.required, Validators.minLength(10)]],
				usrTerminosCondiciones: ['', [Validators.required]],
			},
			{ validator: ConfirmPasswordValidator.MatchPassword },
		)
		// alert('La resolución de tu pantalla es: ' + screen.width + ' x ' + screen.height)

		// const term = this.Form.controls['usrTerminosCondiciones']
		// term.setValue(false)
		// term.valueChanges.subscribe(() => {
		// 	console.log(term.value)
		// })
	}

	/**
	 * Metodo q recibe data del form y envia a service para procesarla
	 */
	async register() {
		const registerUserData = this.Form.value
		registerUserData.usrPassword = btoa(registerUserData.usrPassword)
		this.authService.registerUser(registerUserData).subscribe((resp) => this.presentAlertConfirmRegister())
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValid(field: string, validationType: string) {
		const f = this.Form.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

	goToLogin() {
		this.navCtrl.navigateBack('/login')
	}

	public async confirmarCodigoSaveForm(messageMsge = '') {
		const alert = await this.alertController.create({
			header: 'CODIGO VALIDACIÓN!',
			subHeader: 'Enviado a correo registrado!!!',
			message: messageMsge,
			backdropDismiss: false,
			inputs: [
				{
					name: 'codigoVerificacion',
					type: 'number',
					placeholder: 'Ingrese codigo',
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						// this.goToLogin()
						console.log('Confirm Cancel')
					},
				},
				{
					text: 'Ok',
					cssClass: 'primary',
					handler: ({ codigoVerificacion }) => {
						if (this.codigoVerificacion === parseInt(codigoVerificacion, 10)) {
							this.register()
						} else {
							this.confirmarCodigoSaveForm(`<ion-text color="danger"><strong>Codigo invalido...</strong></ion-text>`)
							this.errorCodValidation = `Codigo de verificación incorrecto, ${codigoVerificacion}`
						}
					},
				},
			],
		})

		await alert.present()
	}

	public async presentAlertConfirmRegister() {
		const alert = await this.alertController.create({
			header: 'REGISTRO EXITOSO!',
			backdropDismiss: false,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel')
					},
				},
				{
					text: 'Ok',
					cssClass: 'primary',
					handler: () => {
						this.goToLogin()
					},
				},
			],
		})

		await alert.present()
	}

	/**
	 * Validamos q el email ingresado pertenezca al usuario
	 */
	async validateEmail() {
		this.emailVerification.usrEmail = this.Form.get('usrEmail').value
		this.emailVerification.usrNames = this.Form.get('usrNames').value
		this.emailVerification.usrLastNames = this.Form.get('usrLastNames').value
		this.authService.codigoVerificacion(this.emailVerification).subscribe(
			(resp) => {
				this.codigoVerificacion = resp.body.codVerificacion
				this.confirmarCodigoSaveForm()
			},
			(error) => {
				console.log(error)
				this.errorCodValidation = error
			},
		)
	}

	/**
	 * Validacion Asyncrona, no funciona aun
	 */
	validateEmailRegistred() {
		return (control: AbstractControl) => {
			const data = {
				email: control.value,
			}
			this.httpservice.Post(data, '/validateEmailRegistred').subscribe((response) => {
				return response ? null : { notAvailable: true }
			})
		}
	}

	goBack() {
		this.location.back()
	}
}
