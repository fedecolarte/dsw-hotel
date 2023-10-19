import { RouterModule, Routes } from "@angular/router";
import { RoomSelectionComponent } from "./room-selection/room-selection.component";
import { NgModule } from "@angular/core";
import { StepFormComponent } from "./step-form/step-form.component";

const routes: Routes = [
    {
      path: '',
      component: RoomSelectionComponent
    },
    {
      path: 'paso-formulario',
      component: StepFormComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ReserveRoutingModule {}
  