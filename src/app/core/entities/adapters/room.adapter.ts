import { Injectable } from '@angular/core';
import { RoomResponse } from '../responses/room.response';
import { RoomTypeView, RoomView } from '../views/room.view';
import { RoomDetailView } from '../views/room-detail.view';
import { RoomDetailResponse } from '../responses/room-detail.response';

@Injectable()
export class RoomAdapter {
  constructor() {}

  roomListResponseToView(roomResponse: RoomResponse): RoomView {
    const finalPrice: number = roomResponse.descuento ?
                                (roomResponse.precio - ((roomResponse.precio * roomResponse.descuento) / 100)) :
                                roomResponse.precio;
    return {
      idRoom: roomResponse.id,
        roomType: {
            id: roomResponse.idTipoHabitacion,
            description: roomResponse.tipoHabitacion
        },
        status: 'Disponible',
        peopleCapacity: roomResponse.capacidadPersonas,
        price: roomResponse.precio,
        discount: roomResponse.descuento,
        finalPrice
    };
  }

  roomDetailResponseToView(roomDetailResponse: RoomDetailResponse): RoomDetailView {
    const characteristics: string[] = roomDetailResponse.caracteristicas.split(', ');
    const roomTypes = this.getRoomTypes();
    const roomType = roomTypes.find((roomType: RoomTypeView) => roomType.id === roomDetailResponse.idTipoHabitacion);
    const finalPrice: number = roomDetailResponse.descuento ?
                                (roomDetailResponse.precio - ((roomDetailResponse.precio * roomDetailResponse.descuento) / 100)) :
                                roomDetailResponse.precio;

    return {
      idRoom: roomDetailResponse.id,
      roomType: {
        id: roomDetailResponse.idTipoHabitacion,
        description: roomType?.description!
      },
      status: 'Disponible',
      peopleCapacity: roomDetailResponse.capacidadPersonas,
      price: roomDetailResponse.precio,
      discount: roomDetailResponse.descuento,
      finalPrice,
      characteristics
    }
  }

  getRoomTypes(): RoomTypeView[] {
    const roomTypes: RoomTypeView[] = [
      {
        id: 1,
        description: "Dúplex"
      },
      {
        id: 2,
        description: "De Lujo"
      }
    ] 
    return roomTypes;
  }
}