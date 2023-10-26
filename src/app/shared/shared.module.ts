import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule, 
    FormsModule, 
    JsonPipe
  ],
  exports: [
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    SpinnerComponent,
    DatepickerComponent
  ],
})
export class SharedModule {}
