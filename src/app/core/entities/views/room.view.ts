export interface RoomView {
    idRoom: number;
    roomType: RoomTypeView;
    status: string;
    peopleCapacity: number;
    price: number;
    discount: number;
    finalPrice: number;
}


export interface RoomTypeView {
    id: number;
    description: string;
}