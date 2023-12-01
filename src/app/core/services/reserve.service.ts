import { Injectable, inject } from '@angular/core';
import { ReserveAdapter } from '../entities/adapters/reserve.adapter';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app-env/environment';
import { Observable, retry, map, catchError, throwError, BehaviorSubject } from 'rxjs';
import { CreateReserveRequest } from '../entities/requests/create-reserve.request';
import { ReserveInfoResponse } from '../entities/responses/create-reserve.response';
import { ReserveInfoView } from '../entities/views/reserve-info.view';
import { StepperService } from './stepper.service';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private http = inject(HttpClient);

  private createReserveLoading = new BehaviorSubject<boolean>(false);
  public createReserveLoading$ = this.createReserveLoading.asObservable();

  private getReservesLoading = new BehaviorSubject<boolean>(false);
  public getReservesLoading$ = this.getReservesLoading.asObservable();
  
  constructor(private reserveAdapter: ReserveAdapter, private stepperService: StepperService) { }

  createReserve(request: CreateReserveRequest): Observable<ReserveInfoView> {
    const endpoint: string = environment.baseUrl + environment.apis.reserveApis.reserve;
    this.createReserveLoading.next(true);

    return this.http.post<ReserveInfoResponse>(endpoint, request).pipe(
      retry(3),
      map((response: ReserveInfoResponse) => {
        this.stepperService.saveStepThree(true);
        this.createReserveLoading.next(false);
        const adaptedReserveInfo: ReserveInfoView = this.reserveAdapter.reserveInfoResponseToView(response);

        return adaptedReserveInfo;
      }),
      catchError((e) => {
        this.createReserveLoading.next(false);
        
        return throwError(() => new Error('Error'));
      })
    )
  }


  getReservesByDocument(documentNumber: string): Observable<ReserveInfoView[]> {
    const endpoint: string = `${environment.baseUrl +  environment.apis.reserveApis.reserve}/${documentNumber}`; 
    this.getReservesLoading.next(true);

    return this.http.get<ReserveInfoResponse[]>(endpoint).pipe(
      retry(3),
      map((response: ReserveInfoResponse[]) => {
        const adaptedReserveInfo: ReserveInfoView[] = this.reserveAdapter.getReservesResponseToView(response);
        this.getReservesLoading.next(false);
        
        return adaptedReserveInfo;
      }),
      catchError((e) => {
        this.getReservesLoading.next(false);

        return throwError(() => new Error('Error'));
      })
    )
  }
}
