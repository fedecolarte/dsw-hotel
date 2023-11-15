import { Injectable } from '@angular/core';
import { ReserveInfoResponse } from '../responses/create-reserve.response';
import { ReserveInfoView } from '../views/reserve-info.view';

@Injectable()
export class ReserveAdapter {
  constructor() {}

  reserveInfoResponseToView(reserveInfoResponse: ReserveInfoResponse): ReserveInfoView {
    return {
        idReseve: reserveInfoResponse.id,
        idRoom: reserveInfoResponse.idHabitacion,
        documentNumber: reserveInfoResponse.documentoCliente,
        checkIn: reserveInfoResponse.fechaEntrada,
        checkOut: reserveInfoResponse.fechaSalida,
        peopleCapacity: reserveInfoResponse.cantidadPersonas,
        paid: reserveInfoResponse.pagada,
        finalPrice: reserveInfoResponse.precioFinal,
    }
  }
}