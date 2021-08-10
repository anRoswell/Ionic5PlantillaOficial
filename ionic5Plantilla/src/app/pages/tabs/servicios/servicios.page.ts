import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MenuController } from '@ionic/angular'
import { AuthenticateService } from './../../../services/authenticate.service'
import { StorageService } from './../../../services/storage.service'

@Component({
	selector: 'app-servicios',
	templateUrl: './servicios.page.html',
	styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private authService: AuthenticateService,
		private storage: StorageService,
		private menu: MenuController,
	) {
		const id = this.route.snapshot.paramMap.get('id')
		console.log(id)
	}

	ngOnInit() {}

	ionViewDidEnter() {
		console.log(`Por aqui pasa cada q entra al tab ServiciosPage ionViewDidEnter`)
		const user = this.storage.read('userLogin')
		console.log(user)
	}

	Logout() {
		this.authService.logout()
	}
}
