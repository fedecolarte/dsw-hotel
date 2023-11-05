import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { RoomDetailView } from '../entities/views/room-detail.view';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor() { }

  private stepOne: BehaviorSubject<RoomDetailView | null> = new BehaviorSubject<RoomDetailView | null>(null);
  public stepOne$: Observable<RoomDetailView | null> = this.stepOne.asObservable();

  saveStepOne(roomDetail: RoomDetailView | null): void {
    this.stepOne.next(roomDetail);
  }

}