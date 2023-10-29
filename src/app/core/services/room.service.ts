import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';
import { RoomView } from '../entities/views/room.view';
import * as searchRoomsResponseMock from '../../../assets/mocks/get-room-types.response.mock.json';
import { RoomResponse } from '../entities/responses/room.response';
import { RoomAdapter } from '../entities/adapters/room.adapter';
import { RoomFilters } from '../filters/room.filters';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private searchRoomsLoading = new BehaviorSubject<boolean>(false);
  searchRoomsLoading$ = this.searchRoomsLoading.asObservable();

  private roomFilters: BehaviorSubject<RoomFilters | null> = new BehaviorSubject<RoomFilters | null>(null);
  public roomFilters$: Observable<RoomFilters | null> = this.roomFilters.asObservable();


  constructor(private roomAdapter: RoomAdapter) { }

  setRoomFilters(roomFilters: RoomFilters | null): void {
    this.roomFilters.next(roomFilters);
  }

  searchRooms(filters: RoomFilters | null): Observable<RoomView[] | null> {
    console.log(filters);
    const mock = searchRoomsResponseMock;
    const response: RoomResponse[] = mock.data;

    if(!filters?.fromDate || !filters?.toDate) return of(null)

    this.searchRoomsLoading.next(true);
    return of(response).pipe(
      delay(2000),
      map((response) => {
        this.searchRoomsLoading.next(false);
        const adaptedResponse: RoomView[] = response.map(room => {
          return this.roomAdapter.roomListResponseToRoomListView(room);
        })
        return adaptedResponse;
      })
    )
  }
}
