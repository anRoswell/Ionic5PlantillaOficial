import { Injectable } from '@angular/core'
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http'
import { Observable, EMPTY, throwError } from 'rxjs'
import { LoadingController, ToastController, AlertController } from '@ionic/angular'
import { retryWhen, delay, take, tap, map, catchError, finalize, switchMap } from 'rxjs/operators'
import { AuthenticateService } from '../services/authenticate.service'

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private auth: AuthenticateService,
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.loadingCtrl.getTop().then((hasLoading) => {
			if (!hasLoading) {
				this.loadingCtrl
					.create({
						spinner: 'circular',
						translucent: true,
					})
					.then((loading) => loading.present())
			}
		})

		return next.handle(request).pipe(
			catchError((err) => {
				if (err instanceof HttpErrorResponse) {
					switch ((err as HttpErrorResponse).status) {
						case 400:
							console.log(`Error 400`)
							return throwError(err)
						case 401:
						case 403:
							this.auth.logout()
							console.log(`Error 401 o 403`)
							return throwError(err)
						default:
							return throwError(err)
					}
				} else {
					return throwError(err)
				}
			}),
			// retryWhen((err) => {
			// 	let retries = 1
			// 	return err.pipe(
			// 		delay(1000),
			// 		take(3),
			// 		tap(() => {
			// 			console.log('Retry')
			// 			this.showRetryToast(retries)
			// 		}),
			// 		map((error) => {
			// 			if (retries++ === 3) {
			// 				throw error
			// 			}
			// 			return error
			// 		}),
			// 	)
			// }),
			catchError((err) => {
				this.presentFailedAlert(err.error.body)
				return EMPTY
			}),
			finalize(() => {
				console.log(`Paso por el finalize`)
				this.loadingCtrl.getTop().then((hasLoading) => {
					if (hasLoading) {
						this.loadingCtrl.dismiss()
					}
				})
			}),
		)
	}

	/**
	 * Muestra Toast con los intentos de reconexión
	 * @param retryCount = contador con numero de intentos
	 */
	async showRetryToast(retryCount: any) {
		const toast = await this.toastCtrl.create({
			message: `Re intentar ${retryCount}/ 3`,
			duration: 3000,
		})
		toast.present()
	}

	/**
	 * Presenta mensaje de error
	 * @param msg = mensaje de error a mostrar
	 */
	async presentFailedAlert(msg: string) {
		console.error(msg)
		const alert = await this.alertCtrl.create({
			header: 'Oops',
			message: msg,
			buttons: ['OK'],
		})
		await alert.present()
		this.loadingCtrl.getTop().then((hasLoading) => {
			if (hasLoading) {
				this.loadingCtrl.dismiss()
			}
		})
	}

	// private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
	// 	console.log(`Debe refrescar token`)
	// 	return this.fakeHttp.getToken().pipe(
	// 		switchMap((res) => {
	// 			console.log(`In switchmap: `, res)
	// 			// store the token

	// 			const token = res['token']
	// 			request = request.clone({
	// 				setParams: { token },
	// 			})
	// 			return next.handle(request)
	// 		}),
	// 	)
	// }
}
