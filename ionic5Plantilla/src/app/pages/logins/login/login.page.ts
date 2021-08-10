import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { StorageService } from 'src/app/services/storage.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public form: FormGroup
	validationsMessage = {
		usrEmail: [
			{
				type: 'required',
				message: 'El email es requerido',
			},
			{
				type: 'pattern',
				message: 'ojo! este no es un email valido',
			},
		],
		usrPassword: [
			{
				type: 'required',
				message: 'El password es requerido',
			},
			{
				type: 'minlength',
				message: 'Minimo 8 letras para el password',
			},
		],
	}
	permisosState = false

	constructor(
		private router: Router,
		private authService: AuthenticateService,
		private storage: StorageService,
		private fb: FormBuilder,
	) {
		this.form = this.fb.group({
			usrEmail: ['', [Validators.required, Validators.email]],
			usrPassword: ['', [Validators.required, Validators.minLength(8)]],
		})
	}

	ngOnInit() {}

	/**
	 * Validamos credenciales para login
	 * @param credentials = Data del formulario
	 */
	async loginUser(credentials: any) {
		credentials.usrPassword = btoa(credentials.usrPassword)
		this.authService.loginUser(credentials).subscribe(
			async (result) => {
				console.log(result)
				const { id } = result.body
				this.storage.save('isUserLoggedIn', true)
				this.storage.save('userLogin', result.body)
				this.router.navigate(['/home/servicios', id])
			},
			(error) => {
				console.log(error)
			},
		)
	}

	/**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValid(field: string, validationType: string) {
		const f = this.form.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}
}
