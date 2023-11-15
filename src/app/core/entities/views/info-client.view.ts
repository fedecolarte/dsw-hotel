import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface InfoClient {
    name: string;
    surname: string;
    gender: 'Masculino' | 'Femenino' | 'Otro';
    documentNumber: string; 
    direction: string;
    floor?: string;
    departament?: string;
    cellphone: string;
    birthdate: NgbDate;
    country: string;
    location: string;
    email: string;
}