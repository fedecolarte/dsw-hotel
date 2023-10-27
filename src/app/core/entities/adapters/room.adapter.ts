import { Injectable } from '@angular/core';
import { RoomResponse } from '../responses/room.response';
import { RoomView } from '../views/room.view';

@Injectable()
export class RoomAdapter {
  constructor() {}

  roomListResponseToRoomListView(roomResponse: RoomResponse): RoomView {
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
}