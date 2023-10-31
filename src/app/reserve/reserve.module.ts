import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveRoutingModule } from './reserve-routing.module';
import { StepFormComponent } from './step-form/step-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { RoomAdapter } from '@app/core/entities/adapters/room.adapter';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from './success/success.component';



@NgModule({
  declarations: [
    StepFormComponent,
    RoomSelectionComponent,
    StepperComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule
  ],
  providers: [
    RoomAdapter
  ]
})
export class ReserveModule { }
