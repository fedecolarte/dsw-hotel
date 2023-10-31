import { Injectable } from '@angular/core';
import { RoomResponse } from '../responses/room.response';
import { RoomView } from '../views/room.view';
import { RoomDetailView } from '../views/room-detail.view';
import { RoomDetailResponse } from '../responses/room-detail.response';

@Injectable()
export class RoomAdapter {
  constructor() {}

  roomListResponseToView(roomResponse: RoomResponse): RoomView {
    return {
      idRoom: roomResponse.idHabitacion,
        roomType: {
            id: roomResponse.idTipoHabitacion,
            description: roomResponse.tipoHabitacion
        },
        status: roomResponse.estado,
        peopleCapacity: roomResponse.capacidadPersonas,
        price: roomResponse.precio
    };
  }

  roomDetailResponseToView(roomDetailResponse: RoomDetailResponse): RoomDetailView {
    const characteristics: string[] = roomDetailResponse.caracteristicas.split(', ');

    return {
      idRoom: roomDetailResponse.idHabitacion,
      roomType: {
        id: roomDetailResponse.idTipoHabitacion,
        description: roomDetailResponse.tipoHabitacion
      },
      status: roomDetailResponse.estado,
      peopleCapacity: roomDetailResponse.capacidadPersonas,
      price: roomDetailResponse.precio,
      characteristics
    }
  }
}