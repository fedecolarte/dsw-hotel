import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreService } from './store.service';
import { UserService } from './user.service';
import { UserAdapter } from '../entities/adapters/user.adapter';
import { ValidateUserRequest } from '../entities/requests/validate-user.request';
import { RegisterUserRequest } from '../entities/requests/register-user.request';
import { ValidateUserResponse } from '../entities/responses/validate-user.response';
import { of } from 'rxjs';
import { ValidateUserView } from '../entities/views/validate-user.view';
import { environment } from '@app-env/environment';


describe('UserService', () => {
  let userService: UserService;
  let storeService: StoreService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, UserAdapter]
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);    
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create service', () => {
    expect(userService).toBeTruthy();
  });

  it('should set and get register mode', () => {
    userService.setRegisterMode(true);
    userService.isRegisterMode$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should set user logged', () => {
    userService.setUserLogged('testUser');
    userService.userLogged$.subscribe((user) => {
      expect(user).toBe('testUser');
    });
  });

  it('should not set user logged if user is null', async () => {
    const userObservable = userService.userLogged$;
    let user: string | null = null;
  
    userObservable.subscribe((value) => {
      user = value;
    });
  
    userService.setUserLogged(null);
  
    await new Promise(resolve => setTimeout(resolve, 0));
  
    expect(user).toBeNull();
  });

  it('should validate user credentials', (done) => {
    const mockUserCredentials: ValidateUserRequest = {
      username: 'testUser',
      password: 'testPassword',
    };
  
    const mockValidateUserResponse: ValidateUserResponse = {
      token: 'testToken',
    };
  
    spyOn(userService['storeService'], 'setToken');
  
    userService.validateUser(mockUserCredentials).subscribe((result: ValidateUserView) => {
      expect(result.isValid).toBe(true);
      expect(userService['validateUserLoading'].value).toBe(false);
      expect(userService['storeService'].setToken).toHaveBeenCalledWith(mockValidateUserResponse.token as string);
      expect(localStorage.getItem('auth')).toBe(mockValidateUserResponse.token ?? '');
      expect(localStorage.getItem('userLogged')).toBe(mockUserCredentials.username);
  
      done();
    });
  
    const req = httpTestingController.expectOne(`${environment.baseUrl}${environment.apis.loginValidator}`);
    expect(req.request.method).toBe('POST');
  
    req.flush(mockValidateUserResponse);
  });

  it('should register user successfully', () => {
    const mockRegisterRequest: RegisterUserRequest = {
      username: 'testUsername',
      password: 'testPassword',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'testEmail@mail.com',
      documento: '123456789',
    };
  
    const expectedResponse = {
      status: 'success',
      message: 'User registered successfully',
    };
  
    userService.registerUser(mockRegisterRequest).subscribe((result) => {
      expect(result).toEqual(expectedResponse);
    });
  
    const req = httpTestingController.expectOne(`${environment.baseUrl}${environment.apis.userApis.user}`);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should get user info', () => {
    const mockUser = 'testUser';
    const mockUserData = {
      username: "testUsername",
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "testEmail@mail.com",
      documentNumber: "123456789",
      estado: "testEstado",
    };
  
    userService.getUserInfo(mockUser).subscribe((result) => {
      expect(userService['getUserLoading'].value).toBe(false);
      expect(result.username).toBe(mockUserData.username);
      expect(result.email).toBe(mockUserData.email);
    });
  
    const expectedUrl = `${environment.baseUrl}${environment.apis.userApis.user}/${mockUser}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  
    userService.getUserInfo(null).subscribe(
      () => fail('Expected an error, but did not get one'),
      (error) => {
        expect(error.message).toBe('Error');
        expect(userService['getUserLoading'].value).toBe(false);
      }
    );
  });
  
});