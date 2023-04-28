import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from '@app-feature/feature-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomTypesComponent } from './room-types/room-types.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ReservationComponent,
    RoomTypesComponent,
    ContactComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule,
  ],
})
export class FeatureModule {}
