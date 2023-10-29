import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomTypesComponent } from './room-types/room-types.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'reserva',
    loadChildren: () => import('../reserve/reserve.module').then((m) => m.ReserveModule),
  },
  {
    path: 'tipos-habitacion',
    component: RoomTypesComponent
  },
  {
    path: 'contacto',
    component: ContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
