import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomDetailView } from '../entities/views/room-detail.view';
import { InfoClient } from '../entities/views/info-client.view';
import { HttpClient } from '@angular/common/http';
import { ReserveAdapter } from '../entities/adapters/reserve.adapter';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  private http = inject(HttpClient);

  constructor(private reserveAdapter: ReserveAdapter) { }

  private stepOne: BehaviorSubject<RoomDetailView | null> = new BehaviorSubject<RoomDetailView | null>(null);
  public stepOne$: Observable<RoomDetailView | null> = this.stepOne.asObservable();

  private stepTwo: BehaviorSubject<InfoClient | null> = new BehaviorSubject<InfoClient | null>(null);
  public stepTwo$: Observable<InfoClient | null> = this.stepTwo.asObservable();

  private stepThree: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  public stepThree$: Observable<boolean | null> = this.stepThree.asObservable();

  private createReserveLoading = new BehaviorSubject<boolean>(false);
  public createReserveLoading$ = this.createReserveLoading.asObservable();

  
  saveStepOne(roomDetail: RoomDetailView | null): void {
    this.stepOne.next(roomDetail);
  }

  saveStepTwo(infoClient: InfoClient | null): void {
    this.stepTwo.next(infoClient);
  }

  saveStepThree(value: boolean | null) {
    this.stepThree.next(value)
  }

  // createReserve(request: CreateReserveRequest): Observable<ReserveInfoView> {
  //   this.stepThree.next(true);
  //   const endpoint: string = environment.baseUrl + environment.apis.reserveApis.reserve;
  //   this.createReserveLoading.next(true);

  //   return this.http.post<ReserveInfoResponse>(endpoint, request).pipe(
  //     retry(3),
  //     map((response: ReserveInfoResponse) => {
  //       this.createReserveLoading.next(false);
  //       const adaptedReserveInfo: ReserveInfoView = this.reserveAdapter.reserveInfoResponseToView(response);

  //       return adaptedReserveInfo;
  //     }),
  //     catchError((e) => {
  //       this.createReserveLoading.next(false);
        
  //       return throwError(() => new Error('Error'));
  //     })
  //   )
  // }

  onDestroy(): void {
    this.stepOne.next(null);
    this.stepTwo.next(null);
    this.stepThree.next(null);
  }
}