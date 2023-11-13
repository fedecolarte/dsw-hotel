import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, retry, take, throwError } from 'rxjs';
import { RoomTypeView, RoomView } from '../entities/views/room.view';
import * as searchRoomsResponseMock from '../../../assets/mocks/get-room-types.response.mock.json';
import * as getRoomDetailResponseMock from '../../../assets/mocks//get-room-detail.response.mock.json';
import { RoomResponse } from '../entities/responses/room.response';
import { RoomAdapter } from '../entities/adapters/room.adapter';
import { RoomFilters } from '../filters/room.filters';
import { RoomDetailResponse } from '../entities/responses/room-detail.response';
import { RoomDetailView } from '../entities/views/room-detail.view';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app-env/environment';
import { format } from 'date-fns';
import { RoomTypeResponse } from '../entities/responses/room-types.response';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private http = inject(HttpClient);

  private searchRoomsLoading = new BehaviorSubject<boolean>(false);
  public searchRoomsLoading$ = this.searchRoomsLoading.asObservable();
  private roomDetailLoading = new BehaviorSubject<boolean>(false);
  public roomDetailLoading$ = this.roomDetailLoading.asObservable();

  private roomFilters: BehaviorSubject<RoomFilters | null> = new BehaviorSubject<RoomFilters | null>(null);
  public roomFilters$: Observable<RoomFilters | null> = this.roomFilters.asObservable();


  constructor(private roomAdapter: RoomAdapter) { }

  setRoomFilters(roomFilters: RoomFilters | null): void {
    this.roomFilters.next(roomFilters);
  }

  searchRooms(filters: RoomFilters | null): Observable<RoomView[] | null> {
    console.log(filters);
    if(!filters?.fechaEntrada || !filters?.fechaSalida) return of(null);

    const endpoint = environment.baseUrl + environment.apis.roomApis.searchRooms;
    console.log(endpoint);
    const payload = {
      ...filters,
      fechaEntrada: format(filters.fechaEntrada, 'yyyy-MM-dd'),
      fechaSalida: format(filters.fechaSalida, 'yyyy-MM-dd')
    }
    this.searchRoomsLoading.next(true);

    return this.http.post<RoomResponse[]>(endpoint, payload).pipe(
      retry(3),
      map((response) => {
        this.searchRoomsLoading.next(false);
        if(!response || response.length === 0) return null;
      
        const adaptedResponse: RoomView[] = response.map(room => {
          return this.roomAdapter.roomListResponseToView(room);
        })

        return adaptedResponse;
      }),
      catchError((e) => {
        this.searchRoomsLoading.next(false);
        console.log(e);

        return throwError(() => new Error('Error'));
      })
    )

    // const mock = searchRoomsResponseMock;
    // const response: RoomResponse[] = mock.data;

    // this.searchRoomsLoading.next(true);
    // return of(response).pipe(
    //   delay(2000),
    //   map((response) => {
    //     this.searchRoomsLoading.next(false);
    //     const adaptedResponse: RoomView[] = response.map(room => {
    //       return this.roomAdapter.roomListResponseToView(room);
    //     })
    //     return adaptedResponse;
    //   })
    // )
  }

  getRoomDetail(roomId: number): Observable<RoomDetailView> {
    let roomTypes: RoomTypeView[];
    this.getRoomTypes().subscribe(tiposHabitacion => roomTypes = tiposHabitacion);

    const url = `${environment.baseUrl}${environment.apis.roomApis.room}/${roomId}`;

    return this.http.get<RoomDetailResponse>(url).pipe(
      retry(3),
      map((detailResponse: RoomDetailResponse) => {
        console.log(roomTypes);
        const adaptedDetailResponse: RoomDetailView = this.roomAdapter.roomDetailResponseToView(detailResponse, roomTypes);
        this.roomDetailLoading.next(false);

        return adaptedDetailResponse;
      }),
      catchError((e) => {
        this.roomDetailLoading.next(false);
        console.log(e);

        return throwError(() => new Error('Error'));
      })
    )
    // console.log(roomId);
    // const response = getRoomDetailResponseMock;

    // this.roomDetailLoading.next(true);
    // return of(response).pipe(
    //   delay(2000),
    //   map((response: RoomDetailResponse) => {
    //     this.roomDetailLoading.next(false);
    //     const adaptedResponse: RoomDetailView = this.roomAdapter.roomDetailResponseToView(response);

    //     return adaptedResponse;
    //   })
    // )
  }

  getRoomTypes(): Observable<RoomTypeView[]> {
    const url = `${environment.baseUrl}${environment.apis.roomApis.roomTypes}`;

    return this.http.get<RoomTypeResponse[]>(url).pipe(
      retry(3),
      map((roomTypes: RoomTypeResponse[]) => {
        const adaptedRoomTypes: RoomTypeView[] = this.roomAdapter.roomTypeResponseToView(roomTypes);

        return adaptedRoomTypes;
      }),
      catchError((e) => {
        console.log(e);

        return throwError(() => new Error('Error'));
      })
    )
  }

  onDestroy(): void {
    this.roomFilters.next(null);
  }
}
