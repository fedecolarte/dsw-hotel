import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { RoomDetailView } from '../entities/views/room-detail.view';
import { InfoClient } from '../entities/views/info-client.view';
import { InfoReserve } from '../entities/views/info-reserve.view';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor() { }

  private stepOne: BehaviorSubject<RoomDetailView | null> = new BehaviorSubject<RoomDetailView | null>(null);
  public stepOne$: Observable<RoomDetailView | null> = this.stepOne.asObservable();

  private stepTwo: BehaviorSubject<InfoClient | null> = new BehaviorSubject<InfoClient | null>(null);
  public stepTwo$: Observable<InfoClient | null> = this.stepTwo.asObservable();

  private stepThree: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  public stepThree$: Observable<boolean | null> = this.stepThree.asObservable();

  
  saveStepOne(roomDetail: RoomDetailView | null): void {
    this.stepOne.next(roomDetail);
  }

  saveStepTwo(infoClient: InfoClient | null): void {
    this.stepTwo.next(infoClient);
  }

  createReserve(infoReserve: InfoReserve): void {
    this.stepThree.next(true);
    console.log(infoReserve);
  }

  onDestroy(): void {
    this.stepOne.next(null);
    this.stepTwo.next(null);
    this.stepThree.next(null);
  }
}