import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, delay, take } from 'rxjs/operators';
import { StoreService } from '../services/store.service';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {

  authReq: HttpRequest<any>;

  constructor(private storeService: StoreService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authReq = request;
    return this.storeService.token$.pipe(
      take(1),
      delay(500),
      concatMap((token) => {
        this.authReq = request.clone({
            headers: new HttpHeaders({
            Authorization: `Bearer ${token}`
            })
        });
        return next.handle(this.authReq);
    }));
  }

}