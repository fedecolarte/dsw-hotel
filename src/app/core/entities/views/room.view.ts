export interface RoomView {
    idRoom: number;
    roomType: RoomTypeView;
    status: string;
    peopleCapacity: number;
    price: number;
}


export interface RoomTypeView {
    id: number;
    description: string;
}