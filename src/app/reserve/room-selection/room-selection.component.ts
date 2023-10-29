import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RoomTypeView, RoomView } from '@app/core/entities/views/room.view';
import { RoomFilters } from '@app/core/filters/room.filters';
import { RoomService } from '@app/core/services/room.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, take } from 'rxjs';
@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.scss']
})
export class RoomSelectionComponent implements OnInit {

  rooms: RoomView[] | null;
  filters: RoomFilters;
  selectedRoomType: RoomTypeView;
  countPeople: number = 6;
  emptyState: string;

  constructor(
    public roomService: RoomService) { 
      this.emptyState = '../../../assets/images/reserve/empty-state.svg'
  }

  ngOnInit(): void {
  }

  getRooms(): void {
    this.roomService.roomFilters$.pipe(
      concatMap((filters) => this.roomService.searchRooms(filters)),
      take(1)
    ).subscribe((rooms) => {
        this.rooms = rooms;
    })
  }

  setDateFilter(value: { fromDate: NgbDate, toDate: NgbDate }): void {
    this.filters = {
      ...this.filters,
      fromDate: value.fromDate,
      toDate: value.toDate
    }
    this.roomService.setRoomFilters(this.filters);
    
    this.getRooms();
  }

  onRoomTypeChange(): void {
    if(this.selectedRoomType === undefined) {
      this.filters = {
        ...this.filters,
        roomType: null
      }
    }
    else {
      this.filters = {
        ...this.filters,
        roomType: this.selectedRoomType
      }
    }
    this.roomService.setRoomFilters(this.filters);

    this.getRooms(); 
  }

  onCountPeopleChange(isAdd: boolean): void {
    let isChanged: boolean = false;
    if(isAdd && this.countPeople < 6) {
      this.countPeople++;
      isChanged = true;
    }
    else if(!isAdd && this.countPeople > 1){
      this.countPeople--;
      isChanged = true;
    } 

    if(isChanged) {
      this.filters = {
        ...this.filters,
        peopleCapacity: this.countPeople
      }
  
      this.roomService.setRoomFilters(this.filters);
  
      this.getRooms();
    }
  }
}
