import { Injectable } from '@angular/core';
import { ValidateUserResponse } from '../responses/validate-user.response';
import { ValidateUserView } from '../views/validate-user.view';
import { ClientInfoResponse } from '../responses/client-info.response';
import { ClientInfoView } from '../views/client-info.view';

@Injectable()
export class ClientAdapter {
  constructor() {}

  clientInfoResponseToView(clientInfoResponse: ClientInfoResponse): ClientInfoView {
    return {
        documentNumber: clientInfoResponse.documento,
        telphone: clientInfoResponse.telefono,
        country: clientInfoResponse.nacionalidad,
        gender: clientInfoResponse.genero,
        birthdate: clientInfoResponse.fechaNacimiento,
        locality: clientInfoResponse.localidad,
        direction: clientInfoResponse.direccion,
        floor: clientInfoResponse.piso,
        department: clientInfoResponse.departamento
    }
  }
}