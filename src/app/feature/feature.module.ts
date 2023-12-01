import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from '@app-feature/feature-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import { RoomTypesComponent } from './room-types/room-types.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RoomTypesComponent,
    ContactComponent,
    HomeComponent,
    MyReservationsComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgbModule
  ],
})
export class FeatureModule {}
