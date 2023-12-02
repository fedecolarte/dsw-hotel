export interface ReserveInfoResponse {
    id: number;
    idHabitacion: number;
    documentoCliente: string;
    fechaEntrada: string;
    fechaSalida: string;
    pagada: boolean;
    precioFinal: number;
    deleteAt?: Date | null;
    cantidadPersonas: number;
}