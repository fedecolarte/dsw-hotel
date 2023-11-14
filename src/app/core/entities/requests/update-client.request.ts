export interface UpdateClientRequest {
    telefono: string;
    nacionalidad: string;
    genero: string;
    fechaNacimiento: string;
    localidad: string;
    direccion: string;
    piso?: string;
    departamento?: string;
}