import { RoomTypeView } from "./room.view";

export interface RoomDetailView {
    idRoom: number;
    roomType: RoomTypeView;
    status: string;
    peopleCapacity: number;
    price: number;
    finalPrice: number;
    discount: number;
    characteristics: string[];
}