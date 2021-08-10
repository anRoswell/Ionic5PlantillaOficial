import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from './../../../services/storage.service'

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.page.html',
	styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
	id: number
	constructor(private route: ActivatedRoute, private storage: StorageService) {
		// this.route.snapshot.params.get('id').then((id: any) => {
		// 	this.id = id
		// 	console.log(id)
		// })
	}

	ngOnInit() {
		console.log(`Por aqui pasa cada q entra al tab NotificationsPage ngOnInit`)
	}

	ionViewDidEnter() {
		console.log(`Por aqui pasa cada q entra al tab NotificationsPage ionViewDidEnter`)
		const user = this.storage.read('userLogin')
		console.log(user)
	}
}
