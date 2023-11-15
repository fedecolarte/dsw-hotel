import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/feature.module').then((m) => m.FeatureModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reserve/reserve.module').then((m) => m.ReserveModule),
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

