import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ServiciosPageRoutingModule } from './servicios-routing.module'

import { ServiciosPage } from './servicios.page'

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ServiciosPageRoutingModule],
	declarations: [ServiciosPage],
})
export class ServiciosPageModule {}
