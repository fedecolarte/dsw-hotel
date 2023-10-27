import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';
import { RoomView } from '../entities/views/room.view';
import * as searchRoomsResponseMock from '../../../assets/mocks/get-room-types.response.mock.json';
import { RoomResponse } from '../entities/responses/room.response';
import { RoomAdapter } from '../entities/adapters/room.adapter';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private searchRoomsLoading = new BehaviorSubject<boolean>(false);
  searchRoomsLoading$ = this.searchRoomsLoading.asObservable();


  constructor(private roomAdapter: RoomAdapter) { }

  searchRooms(filters: any): Observable<any> {
    const mock = searchRoomsResponseMock;
    const response: RoomResponse[] = mock.data;

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
