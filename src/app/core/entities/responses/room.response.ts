import { RoomTypeResponse } from "./room-types.response";

export interface RoomResponse {
    id: number;
    tipoHabitacion: RoomTypeResponse;
    estado: string;
    capacidadPersonas: number;
    descuento: number;
    precio: number;
}