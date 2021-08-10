import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';

import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ChartsModule],
})
export class StatisticsModule {}
