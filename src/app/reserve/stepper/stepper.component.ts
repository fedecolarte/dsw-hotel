import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StepperService } from '@app/core/services/stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  active = 1;
  pb1: number = 0;
  pb2: number = 0;
  pb3: number = 0;
  constructor(public stepperService: StepperService) { }

  ngOnInit(): void {
  }

  goNextStep(): void {
    this.active++;
    this.changeStep();
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

}
