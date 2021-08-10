import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MeetAsPage } from './meet-as.page'

const routes: Routes = [
	{
		path: '',
		component: MeetAsPage,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MeetAsPageRoutingModule {}
