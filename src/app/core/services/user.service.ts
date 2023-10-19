import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, async, delay, map, of } from 'rxjs';
import { ValidateUserRequest } from '../entities/requests/validate-user.request';
import * as validateUserResponseMock from '../../../assets/mocks/validate-user.response.mock.json';
import { ValidateUserResponse } from '../entities/responses/validate-user.response';
import { ValidateUserView } from '../entities/views/validate-user.view';
import { UserAdapter } from '../entities/adapters/user.adapter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isRegisterMode = new BehaviorSubject<boolean>(false);
  private validateUserLoading = new BehaviorSubject<boolean>(false);
  private userLogged = new BehaviorSubject<string | null>(null);
  private isLogged = new BehaviorSubject<boolean>(false);

  isRegisterMode$ = this.isRegisterMode.asObservable(); 
  validateUserLoading$ = this.validateUserLoading.asObservable(); 
  userLogged$ = this.userLogged.asObservable();
  isLogged$ = this.isLogged.asObservable();

  constructor(private userAdapter: UserAdapter) { }

  setRegisterMode(value: boolean): void {
    this.isRegisterMode.next(value);
  }

  setUserLogged(user: string, isLogin: boolean): void {
    if(isLogin) this.userLogged.next(user);
    else this.userLogged.next(null);

    this.isLogged.next(isLogin);
  }

  validateUser(userCredentials: ValidateUserRequest): Observable<ValidateUserView> {
    const response: ValidateUserResponse = validateUserResponseMock;
    this.validateUserLoading.next(true);
    return of(response).pipe(
      delay(2000),
      map((validationResponse) => {
        this.validateUserLoading.next(false);
        return this.userAdapter.validateUserResponseToValidateUserView(validationResponse);
      })
    )
  }
}
