import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoomDetailView } from '@app/core/entities/views/room-detail.view';
import { RoomService } from '@app/core/services/room.service';
import { StepperService } from '@app/core/services/stepper.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-step-detail-room',
  templateUrl: './step-detail-room.component.html',
  styleUrls: ['./step-detail-room.component.scss']
})
export class StepDetailRoomComponent implements OnInit {

  @Output() goNextStep = new EventEmitter<any>();

  img: string;
  roomDetail: RoomDetailView;
  cardsHotel: {
    description: string;
    icon: string
  }[];

  constructor(
    private stepperService: StepperService,
    public roomService: RoomService
    ) {
      this.img = '../../../assets/images/reserve/room.jpg';
      this.cardsHotel = [
        {
          description: "Spa",
          icon: "spa"
        },
        {
          description: "Gimnasio",
          icon: "fitness_center"
        },
        {
          description: "Cajero automático",
          icon: "local_atm"
        },
        {
          description: "Cafetería",
          icon: "local_cafe"
        },
        {
          description: "Servicio a la habitación",
          icon: "room_service"
        },
        {
          description: "Servicio médico",
          icon: "medical_services"
        },
        {
          description: "Atención telefónica",
          icon: "support_agent"
        },
        {
          description: "Red WiFi global",
          icon: "wifi"
        },
      ]
    }

  ngOnInit(): void {
    this.roomService.getRoomDetail(5).pipe(take(1)).subscribe(roomDetail => {
      this.roomDetail = roomDetail;
    })
  }

  goBack(): void {
    
  }

  saveStep(): void {
    this.stepperService.saveStepOne();
    this.goNextStep.emit(true);
  }
}
