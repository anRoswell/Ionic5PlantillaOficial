import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { HomePage } from './home.page'
import { LoginGuard } from '../guards/login.guard'

// Here import the user authenticated pages.
const routes: Routes = [
	{
		path: 'home',
		component: HomePage,
		children: [
			{
				path: 'encuentranos',
				canActivate: [LoginGuard],
				children: [
					{
						path: '',
						loadChildren: () => import('./../pages/tabs/meet-as/meet-as.module').then((m) => m.MeetAsPageModule),
					},
				],
			},
			{
				path: 'notificaciones',
				canActivate: [LoginGuard],
				children: [
					{
						path: '',
						loadChildren: () =>
							import('./../pages/tabs/notifications/notifications.module').then((m) => m.NotificationsPageModule),
					},
				],
			},
			{
				path: 'contactanos',
				canActivate: [LoginGuard],
				children: [
					{
						path: '',
						loadChildren: () => import('./../pages/tabs/contact/contact.module').then((m) => m.ContactPageModule),
					},
				],
			},
			{
				path: 'servicios/:id',
				canActivate: [LoginGuard],
				children: [
					{
						path: '',
						loadChildren: () => import('./../pages/tabs/servicios/servicios.module').then((m) => m.ServiciosPageModule),
					},
				],
			},
			{
				path: 'servicios',
				canActivate: [LoginGuard],
				children: [
					{
						path: '',
						loadChildren: () => import('./../pages/tabs/servicios/servicios.module').then((m) => m.ServiciosPageModule),
					},
				],
			},
			// {
			// 	path: '**',
			// 	redirectTo: '/home/servicios',
			// 	pathMatch: 'full',
			// },
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRouter {}
