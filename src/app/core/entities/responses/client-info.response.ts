export interface ClientInfoResponse {
    documento: string,
    username: string,
    telefono?: string,
    nacionalidad?: string,
    genero?: string,
    fechaNacimiento?: Date,
    localidad?: string,
    direccion?: string,
    piso?: string,
    departamento?: string
}