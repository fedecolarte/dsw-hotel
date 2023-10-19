import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveRoutingModule } from './reserve-routing.module';
import { StepFormComponent } from './step-form/step-form.component';



@NgModule({
  declarations: [
    StepFormComponent
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
  ]
})
export class ReserveModule { }
