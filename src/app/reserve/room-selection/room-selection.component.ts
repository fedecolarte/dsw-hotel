import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAnimation } from '@app/core/animations/fade.animation';
import { RoomTypeView, RoomView } from '@app/core/entities/views/room.view';
import { RoomFilters } from '@app/core/filters/room.filters';
import { RoomService } from '@app/core/services/room.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, take } from 'rxjs';
@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.scss'],
  animations: [fadeAnimation]
})
export class RoomSelectionComponent implements OnInit {

  rooms: RoomView[] | null;
  filters: RoomFilters;
  selectedRoomType: RoomTypeView;
  countPeople: number = 2;
  emptyState: string;
  roomTypes: RoomTypeView[];

  constructor(
    public roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      this.emptyState = '../../../assets/images/reserve/empty-state.svg'
  }

  ngOnInit(): void {
    this.getRoomTypes();
  }

  getRooms(): void {
    this.roomService.roomFilters$.pipe(
      concatMap((filters) => this.roomService.searchRooms(filters)),
      take(1)
    ).subscribe((rooms) => {
        this.rooms = rooms;
    })
  }

  getRoomTypes(): void {
    this.roomService.getRoomTypes().pipe(take(1)).subscribe(roomTypes => {
      this.roomTypes = roomTypes;
    })
  }

  setDateFilter(value: { fromDate: NgbDate, toDate: NgbDate }): void {
    this.filters = {
      ...this.filters,
      fechaEntrada: new Date(value.fromDate.year, value.fromDate.month - 1, value.fromDate.day ),
      fechaSalida: new Date(value.toDate.year, value.toDate.month - 1, value.toDate.day )
    }
    this.roomService.setRoomFilters(this.filters);
    
    this.getRooms();
  }

  onRoomTypeChange(): void {
    if(this.selectedRoomType === undefined) {
      this.filters = {
        ...this.filters,
        idTipoHabitacion: null
      }
    }
    else {
      this.filters = {
        ...this.filters,
        idTipoHabitacion: this.selectedRoomType.id
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
        capacidadPersonas: this.countPeople
      }
  
      this.roomService.setRoomFilters(this.filters);
  
      this.getRooms();
    }
  }

  navigateToReserveProcess(idRoom: number): void {
    const route = `reserva-habitacion/${idRoom}`;

    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
}
