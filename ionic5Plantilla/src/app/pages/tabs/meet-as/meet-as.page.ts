import { Component, OnInit } from '@angular/core'
import { StorageService } from './../../../services/storage.service'

@Component({
	selector: 'app-meet-as',
	templateUrl: './meet-as.page.html',
	styleUrls: ['./meet-as.page.scss'],
})
export class MeetAsPage implements OnInit {
	title = 'Este es un ejemplo de carga'
	constructor(private storage: StorageService) {}

	ngOnInit() {
		console.log(`Por aqui pasa cada q entra al tab NotificationsPage ngOnInit`)
	}

	ionViewDidEnter() {
		console.log(`Por aqui pasa cada q entra al tab MeetAsPage ionViewDidEnter`)
		const user = this.storage.read('userLogin')
		console.log(user)
	}
}
