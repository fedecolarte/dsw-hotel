import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { RoomTypeView } from "../entities/views/room.view";

export class RoomFilters {
    fromDate: NgbDate;
    toDate: NgbDate;
    roomType?: RoomTypeView | null;
    peopleCapacity?: number | null;
  }