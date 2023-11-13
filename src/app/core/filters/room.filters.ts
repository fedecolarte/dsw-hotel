import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { RoomTypeView } from "../entities/views/room.view";

export class RoomFilters {
    fechaEntrada: Date;
    fechaSalida: Date;
    idTipoHabitacion?: number | null;
    capacidadPersonas?: number | null;
  }