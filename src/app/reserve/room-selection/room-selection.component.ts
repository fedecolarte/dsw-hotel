import { Component, OnInit } from '@angular/core';
import { RoomView } from '@app/core/entities/views/room.view';
import { RoomService } from '@app/core/services/room.service';
@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.scss']
})
export class RoomSelectionComponent implements OnInit {

  rooms: RoomView[];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    const filters = null;
    this.roomService.searchRooms(filters).subscribe(rooms => {
      this.rooms = rooms;
      console.log(this.rooms)
    })

  }

}
