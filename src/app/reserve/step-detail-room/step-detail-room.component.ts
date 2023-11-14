import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAnimation } from '@app/core/animations/fade.animation';
import { RoomDetailView } from '@app/core/entities/views/room-detail.view';
import { RoomService } from '@app/core/services/room.service';
import { StepperService } from '@app/core/services/stepper.service';
import { concatMap, take } from 'rxjs';

@Component({
  selector: 'app-step-detail-room',
  templateUrl: './step-detail-room.component.html',
  styleUrls: ['./step-detail-room.component.scss'],
  animations: [fadeAnimation]
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public stepperService: StepperService,
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
    this.activatedRoute.params.pipe(
      concatMap((params) => this.roomService.getRoomDetail(params['idRoom'])),
      take(1)
    ).subscribe((roomDetail) => {
      this.roomDetail = roomDetail;
    })
  }

  goBack(){
    this.router.navigate(['/reservas']);
  }

  saveStep(): void {
    this.stepperService.saveStepOne(this.roomDetail);
    this.goNextStep.emit(true);
  }
}
