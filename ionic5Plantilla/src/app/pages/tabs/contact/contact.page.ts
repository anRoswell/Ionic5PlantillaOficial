import { Component, OnInit } from '@angular/core'
import { StorageService } from './../../../services/storage.service'

@Component({
	selector: 'app-contact',
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
	constructor(private storage: StorageService) {}

	ngOnInit() {
		console.log(`Por aqui pasa cada q entra al tab NotificationsPage ngOnInit`)
	}

	ionViewDidEnter() {
		console.log(`Por aqui pasa cada q entra al tab ContactPage ionViewDidEnter`)
		const user = this.storage.read('userLogin')
		console.log(user)
	}
}
