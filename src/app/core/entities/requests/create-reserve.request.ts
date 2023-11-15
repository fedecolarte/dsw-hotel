export interface CreateReserveRequest {
    fechaEntrada: string;
    fechaSalida: string,
    idHabitacion: number,
    documentoCliente: string,
    precioFinal: number,
    pagada: boolean,
    cantidadPersonas: number,
}