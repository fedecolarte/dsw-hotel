import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from '@app-feature/feature-routing.module';
import { SharedModule } from '@app-shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule,
  ],
})
export class FeatureModule {}
