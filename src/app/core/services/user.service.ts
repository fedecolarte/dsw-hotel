import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isRegisterMode = new BehaviorSubject<boolean>(false);
  isRegisterMode$ = this.isRegisterMode.asObservable();

  constructor() { }

  setRegisterMode(value: boolean): void {
    this.isRegisterMode.next(value);
  }
}
