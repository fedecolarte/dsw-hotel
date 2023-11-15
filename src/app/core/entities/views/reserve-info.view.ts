export interface ReserveInfoView {
    idReseve: number;
    idRoom: number;
    documentNumber: string;
    checkIn: string;
    checkOut: string;
    peopleCapacity: number;
    paid: boolean;
    finalPrice: number;
}