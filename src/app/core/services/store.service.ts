import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private tokenSource = new BehaviorSubject<string | null> (null);
  token$ = this.tokenSource.asObservable();

  constructor() { }

  setToken(token: string) {
    this.tokenSource.next(token);
  }
}
