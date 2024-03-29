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
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from './success/success.component';
import { StepDetailRoomComponent } from './step-detail-room/step-detail-room.component';
import { SummaryAndPaymentComponent } from './summary-and-payment/summary-and-payment.component';
import { ObligatoryLoginComponent } from './obligatory-login/obligatory-login.component';



@NgModule({
  declarations: [
    StepFormComponent,
    RoomSelectionComponent,
    StepperComponent,
    SuccessComponent,
    StepDetailRoomComponent,
    SummaryAndPaymentComponent,
    ObligatoryLoginComponent,
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    NgbModule
  ],
  providers: [
    RoomAdapter
  ]
})
export class ReserveModule { }
