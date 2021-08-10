import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { IndexPage } from './index.page'

// Create a router class and import unauthenticated pages here.
const routes: Routes = [
	{
		path: '',
		component: IndexPage,
		children: [
			{
				path: '',
				loadChildren: () => import('./../pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
			},
			{
				path: 'login',
				loadChildren: () => import('./../pages/logins/login/login.module').then((m) => m.LoginPageModule),
			},
			{
				path: 'forgot-password',
				loadChildren: () =>
					import('./../pages/logins/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
			},
			{
				path: 'register',
				loadChildren: () => import('./../pages/logins/register/register.module').then((m) => m.RegisterPageModule),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class IndexRouter {}
