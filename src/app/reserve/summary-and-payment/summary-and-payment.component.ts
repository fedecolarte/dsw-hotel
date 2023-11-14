import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfoReserve } from '@app/core/entities/views/info-reserve.view';
import { RoomService } from '@app/core/services/room.service';
import { StepperService } from '@app/core/services/stepper.service';
import { Observable, combineLatest, concatMap, map, take } from 'rxjs';
import { format, parseISO, formatISO } from 'date-fns';
import { Router } from '@angular/router';


@Component({
  selector: 'app-summary-and-payment',
  templateUrl: './summary-and-payment.component.html',
  styleUrls: ['./summary-and-payment.component.scss']
})
export class SummaryAndPaymentComponent implements OnInit {

  @Output() goNextStep = new EventEmitter<any>();
  @Output() goPrevStep = new EventEmitter<any>();


  paymentImg: string;
  reserveInfo$: Observable<InfoReserve | null>;
  reserveInfo: InfoReserve;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private stepperService: StepperService
  ) {
    this.paymentImg = '../../../assets/images/reserve/payment.svg'
  }


  ngOnInit(): void {
    this.reserveInfo$ = combineLatest({
      filters: this.roomService.roomFilters$,
      stepOne: this.stepperService.stepOne$,
      stepTwo: this.stepperService.stepTwo$
    })
      .pipe(
        map(({ filters, stepOne, stepTwo }) => {
          if(filters !== null && stepOne !== null && stepTwo !== null) {
            const infoReserve: InfoReserve = {
              roomId: stepOne.idRoom,
              roomType: stepOne.roomType.description,
              checkIn: format(filters.fechaEntrada, 'dd/MM/yyyy'),
              checkOut: format(filters.fechaSalida, 'dd/MM/yyyy'),
              peopleCapacity: stepOne.peopleCapacity,
              price: stepOne.finalPrice,
              discount: stepOne.discount,
              clientName: stepTwo.name,
              clientSurname: stepTwo.surname,
              documentNumber: stepTwo.documentNumber,
              birthdate: format(new Date(stepTwo.birthdate.year, stepTwo.birthdate.month - 1, stepTwo.birthdate.day), 'dd/MM/yyyy'),
              email: stepTwo.email,
              cellphone: stepTwo.cellphone
            }

            this.reserveInfo = infoReserve;
            return infoReserve;
          }

          return null;
        }),
      );

  }

  goBack(): void {
    this.goPrevStep.emit(true);
  }

  saveStep(): void {
    this.stepperService.createReserve(this.reserveInfo);
    this.goNextStep.emit(true);
  }
}
