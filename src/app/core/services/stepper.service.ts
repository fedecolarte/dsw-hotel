import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor() { }

  private stepOne: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public stepOne$: Observable<boolean> = this.stepOne.asObservable();

  saveStepOne(): void {
    this.stepOne.next(true);
  }

}