import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { fadeAnimation } from '@app/core/animations/fade.animation';
import { LoginComponent } from '@app/core/components/login/login.component';
import { StepperService } from '@app/core/services/stepper.service';
import { UserService } from '@app/core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  animations: [fadeAnimation]
})
export class StepperComponent implements OnInit, OnDestroy {

  active = 1;
  pb1: number = 0;
  pb2: number = 0;
  pb3: number = 0;

  constructor(
    public stepperService: StepperService,
    public userService: UserService) {}

  ngOnInit(): void {
    window.scroll({ top: 0 });
  }

  goPrevStep(): void {
    this.active--;
    this.changeStep();
  }

  goNextStep(): void {
    this.active++;
    this.changeStep();
 
    window.scroll({ top: 0 });
  }

  changeStep(): void {
    switch(this.active) {
      case 1: {
        this.pb1 = 0;
        this.pb2 = 0;
        this.pb3 = 0;
        break;
      }
      
      case 2: {
        this.pb1 = 100;
        this.pb2 = 0;
        this.pb3 = 0;
        break;
      }

      case 3: {
        this.pb1 = 100;
        this.pb2 = 100;
        this.pb3 = 0;
        break;
      }

      case 4: {
        this.pb1 = 100;
        this.pb2 = 100;
        this.pb3 = 100;
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.stepperService.onDestroy();
  }

}
