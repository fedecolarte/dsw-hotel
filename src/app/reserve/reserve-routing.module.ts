import { RouterModule, Routes } from "@angular/router";
import { RoomSelectionComponent } from "./room-selection/room-selection.component";
import { NgModule } from "@angular/core";
import { StepFormComponent } from "./step-form/step-form.component";
import { StepperComponent } from "./stepper/stepper.component";

const routes: Routes = [
    {
      path: '',
      component: RoomSelectionComponent
    },
    {
      path: 'reserva-habitacion',
      component: StepperComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ReserveRoutingModule {}
  