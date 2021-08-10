import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PqrFormComponent } from './pqrs/pqr-form.component';
import { PqrsComponent } from './pqrs/pqrs.component';

// Slider
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [PqrsComponent, PqrFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgImageSliderModule,
  ],
})
export class ReportModule {}
