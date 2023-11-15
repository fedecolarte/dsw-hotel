import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomTypesComponent } from './room-types/room-types.component';
import { ContactComponent } from './contact/contact.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { AuthGuard } from '@app/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'reservas',
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
  {
    path: 'mis-reservas',
    component: MyReservationsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
