import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, retry, throwError } from 'rxjs';
import { environment } from '@app-env/environment';
import { HttpClient } from '@angular/common/http';
import { ClientInfoView } from '../entities/views/client-info.view';
import { ClientInfoResponse } from '../entities/responses/client-info.response';
import { ClientAdapter } from '../entities/adapters/client.adapter';
import { UpdateClientRequest } from '../entities/requests/update-client.request';
import { InfoClient } from '../entities/views/info-client.view';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private http = inject(HttpClient);
  private clientInfoLoading = new BehaviorSubject<boolean>(false);
  public clientInfoLoading$ = this.clientInfoLoading.asObservable();

  constructor(private clientAdapter: ClientAdapter) { }

  GetClientInfo(documentNumber: string): Observable<ClientInfoView> {
    const url = `${environment.baseUrl}${environment.apis.clientApis.client}/${documentNumber}`;
    this.clientInfoLoading.next(true);

    return this.http.get<ClientInfoResponse>(url).pipe(
      retry(3),
      map((infoClient: ClientInfoResponse) => {
        const adaptedResponse: ClientInfoView = this.clientAdapter.clientInfoResponseToView(infoClient);
        this.clientInfoLoading.next(false);

        return adaptedResponse;
      }),
      catchError((e) => {
        console.log(e);
        this.clientInfoLoading.next(false);

        return throwError(() => new Error('Error'));
      })
    )
  }

  updateClientInfo(infoClient: InfoClient): Observable<any> {
    const updateClientRequest: UpdateClientRequest = {
      telefono: infoClient.cellphone,
      nacionalidad: infoClient.country,
      genero: infoClient.gender,
      fechaNacimiento: format(new Date(infoClient.birthdate.year, infoClient.birthdate.month - 1, infoClient.birthdate.day), 'yyyy-MM-dd'),
      localidad: infoClient.location,
      direccion: infoClient.direction,
      piso: infoClient.floor,
      departamento: infoClient.departament
    }

    const url = `${environment.baseUrl}${environment.apis.clientApis.client}/${infoClient.documentNumber}`;
    return this.http.put<any>(url, updateClientRequest);
  }
}