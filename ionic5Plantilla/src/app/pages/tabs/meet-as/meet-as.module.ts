import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { MeetAsPageRoutingModule } from './meet-as-routing.module'

import { MeetAsPage } from './meet-as.page'

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, MeetAsPageRoutingModule],
	declarations: [MeetAsPage],
})
export class MeetAsPageModule {}
