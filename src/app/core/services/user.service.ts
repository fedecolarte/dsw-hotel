import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, async, delay, map, of } from 'rxjs';
import { ValidateUserRequest } from '../entities/requests/validate-user.request';
import * as validateUserResponseMock from '../../../assets/mocks/validate-user.response.mock.json';
import { ValidateUserResponse } from '../entities/responses/validate-user.response';
import { ValidateUserView } from '../entities/views/validate-user.view';
import { UserAdapter } from '../entities/adapters/user.adapter';
import { AsyncPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isRegisterMode = new BehaviorSubject<boolean>(false);
  isRegisterMode$ = this.isRegisterMode.asObservable(); 
  private validateUserLoading = new BehaviorSubject<boolean>(false);
  validateUserLoading$ = this.validateUserLoading.asObservable(); 

  constructor(private userAdapter: UserAdapter) { }

  setRegisterMode(value: boolean): void {
    this.isRegisterMode.next(value);
  }

  validateUser(userCredentials: ValidateUserRequest): Observable<ValidateUserView> {
    const response: ValidateUserResponse = validateUserResponseMock;
    this.validateUserLoading.next(true);
    return of(response).pipe(
      delay(10000),
      map((validationResponse) => {
        this.validateUserLoading.next(false);
        return this.userAdapter.validateUserResponseToValidateUserView(validationResponse);
      })
    )
  }
}
