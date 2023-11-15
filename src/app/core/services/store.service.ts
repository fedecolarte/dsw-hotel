import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private tokenSource = new BehaviorSubject<string | null> (null);
  token$ = this.tokenSource.asObservable();

  constructor() { }

  setToken(token: string | null) {
    this.tokenSource.next(token);
  }

  initToken(): void {
    const storedToken = localStorage.getItem('auth');
    console.log(storedToken);

    if(!this.isTokenExpired(storedToken)){
      console.log('isSetted')
      this.setToken(storedToken);
    }
    else {
      localStorage.clear();
      this.setToken(null);
    }
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }

    try {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(decodedToken.exp * 1000);
      console.log(expirationDate);
      return expirationDate <= new Date();
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true;
    }
  }
}
