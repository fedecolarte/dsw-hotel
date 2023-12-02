import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '@app/core/services/room.service';
import { StepperService } from '@app/core/services/stepper.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(
    private router: Router,
    private stepperService: StepperService,
    private roomService: RoomService
    ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['/reservas']);
    this.onDestroyServices();
  }

  goToMyReserves(): void {
    this.router.navigate(['/mis-reservas']);
    this.onDestroyServices();
  }

  onDestroyServices(): void {
    this.stepperService.onDestroy();
    this.roomService.onDestroy();
  }
}
