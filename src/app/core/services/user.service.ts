import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, async, catchError, delay, map, of, retry, take, throwError } from 'rxjs';
import { ValidateUserRequest } from '../entities/requests/validate-user.request';
import * as validateUserResponseMock from '../../../assets/mocks/validate-user.response.mock.json';
import { ValidateUserResponse } from '../entities/responses/validate-user.response';
import { ValidateUserView } from '../entities/views/validate-user.view';
import { UserAdapter } from '../entities/adapters/user.adapter';
import { environment } from '@app-env/environment';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { RegisterUserRequest } from '../entities/requests/register-user.request';
import { UserInfoView } from '../entities/views/user-info.view';
import { UserInfoResponse } from '../entities/responses/user-info.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private storeService = inject(StoreService);
  
  private isRegisterMode = new BehaviorSubject<boolean>(false);
  private registerPersonLoading = new BehaviorSubject<boolean>(false);

  private validateUserLoading = new BehaviorSubject<boolean>(false);
  private userLogged = new BehaviorSubject<string | null>(null);
  private isLogged = new BehaviorSubject<boolean>(false);

  isRegisterMode$ = this.isRegisterMode.asObservable(); 
  registerPersonLoading$ = this.registerPersonLoading.asObservable();
  
  validateUserLoading$ = this.validateUserLoading.asObservable(); 
  userLogged$ = this.userLogged.asObservable();
  isLogged$ = this.isLogged.asObservable();

  constructor(
    private userAdapter: UserAdapter) {
      const token = localStorage.getItem('auth');
      const user = localStorage.getItem('userLogged');
      this.isLogged.next(!!token);
      this.userLogged.next(user);
    }

  setRegisterMode(value: boolean): void {
    this.isRegisterMode.next(value);
  }

  setUserLogged(user: string | null): void {
    if(user) {
      this.userLogged.next(user);
      this.isLogged.next(true);
    }
    else {
      this.userLogged.next(null);
      this.isLogged.next(false);
    }

  }

  validateUser(userCredentials: ValidateUserRequest): Observable<ValidateUserView> {
    const endpoint: string = environment.baseUrl + environment.apis.loginValidator;
    console.log(endpoint);
    this.validateUserLoading.next(true);
    
    return this.http.post<ValidateUserResponse>(endpoint, userCredentials).pipe(
      retry(3),
      map((info) => {
        this.validateUserLoading.next(false);
        if(info.token) {
          this.storeService.setToken(info.token);
          localStorage.setItem('auth', info.token);
          localStorage.setItem('userLogged', userCredentials.username);
        }

        return this.userAdapter.validateUserResponseToValidateUserView(info);
      }),
      catchError((e) => {
        this.validateUserLoading.next(false);
        console.log(e);

        return throwError(() => new Error('Error'));
      })
    )
    // const response: ValidateUserResponse = validateUserResponseMock;
    // this.validateUserLoading.next(true);
    // return of(response).pipe(
    //   delay(2000),
    //   map((validationResponse) => {
    //     this.validateUserLoading.next(false);
    //     return this.userAdapter.validateUserResponseToValidateUserView(validationResponse);
    //   })
    // )
  }

  registerUser(registerRequest: RegisterUserRequest): Observable<any> {
    const endpoint: string = environment.baseUrl + environment.apis.userApis.user;
    console.log(endpoint);
    this.registerPersonLoading.next(true);

     return this.http.post<any>(endpoint, registerRequest).pipe(
       retry(3),
       map((response) => {
         this.registerPersonLoading.next(false);
         return response;
       }),
       catchError((e) => {
         this.registerPersonLoading.next(false);
         console.log(e);
         
         return throwError(() => new Error('Error'));
    })
  )
    // const response: ValidateUserResponse = validateUserResponseMock;
    // this.validateUserLoading.next(true);
    // return of(response).pipe(
    //   delay(2000),
    //   map((validationResponse) => {
    //     this.validateUserLoading.next(false);
    //     return this.userAdapter.validateUserResponseToValidateUserView(validationResponse);
    //   })
    // )
  }

  getUserInfo(user: string | null): Observable<UserInfoView> {
    if(user) {
      const url = `${environment.baseUrl}${environment.apis.userApis.user}/${user}`;
  
      return this.http.get<UserInfoResponse>(url).pipe(
        retry(3),
        map((detailResponse: UserInfoResponse) => {
          const adaptedUserInfo: UserInfoView = this.userAdapter.UserInfoResponseToView(detailResponse);
  
          return adaptedUserInfo;
        }),
        catchError((e) => {
          console.log(e);
  
          return throwError(() => new Error('Error'));
        })
      )
    }
    else return throwError(() => new Error('Error'));
  }
}
