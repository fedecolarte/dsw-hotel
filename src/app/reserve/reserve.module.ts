import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveRoutingModule } from './reserve-routing.module';
import { StepFormComponent } from './step-form/step-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { RoomAdapter } from '@app/core/entities/adapters/room.adapter';



@NgModule({
  declarations: [
    StepFormComponent,
    RoomSelectionComponent,
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    SharedModule,
  ],
  providers: [
    RoomAdapter
  ]
})
export class ReserveModule { }
