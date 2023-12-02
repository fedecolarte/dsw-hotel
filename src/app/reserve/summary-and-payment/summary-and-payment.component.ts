import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfoReserve } from '@app/core/entities/views/info-reserve.view';
import { RoomService } from '@app/core/services/room.service';
import { StepperService } from '@app/core/services/stepper.service';
import { Observable, combineLatest, map, take } from 'rxjs';
import { format } from 'date-fns';
import { CreateReserveRequest } from '@app/core/entities/requests/create-reserve.request';
import { ReserveService } from '@app/core/services/reserve.service';


@Component({
  selector: 'app-summary-and-payment',
  templateUrl: './summary-and-payment.component.html',
  styleUrls: ['./summary-and-payment.component.scss']
})
export class SummaryAndPaymentComponent implements OnInit {

  @Output() goNextStep = new EventEmitter<any>();
  @Output() goPrevStep = new EventEmitter<any>();


  paymentImg: string;
  mercadoPagoImg: string;
  cashImg: string;



  reserveInfo$: Observable<InfoReserve | null>;
  reserveInfo: InfoReserve;
  checkIn: Date;
  checkOut: Date;
  paymentMethod: string;

  constructor(
    private roomService: RoomService,
    private stepperService: StepperService,
    private reserveService: ReserveService
  ) {
    this.paymentImg = '../../../assets/images/reserve/payment.svg';
    this.mercadoPagoImg = '../../../assets/icons/mercado-pago.icon.png';
    this.cashImg = '../../../assets/icons/cash.icon.png';
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

            this.checkIn = filters.fechaEntrada;
            this.checkOut = filters.fechaSalida;

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
    const payload: CreateReserveRequest = {
      fechaEntrada: format(this.checkIn, 'yyyy-MM-dd'),
      fechaSalida: format(this.checkOut, 'yyyy-MM-dd'),
      idHabitacion: this.reserveInfo.roomId,
      documentoCliente: this.reserveInfo.documentNumber,
      precioFinal: this.reserveInfo.price,
      pagada: false,
      cantidadPersonas: this.reserveInfo.peopleCapacity
    }
    
    this.reserveService.createReserve(payload).pipe(take(1)).subscribe();
    this.goNextStep.emit(true);
  }
}
