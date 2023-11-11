import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CredentialsInterceptor } from '@app/core/interceptors/credentials.interceptor';


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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    },
  ]
})
export class SharedModule {}
