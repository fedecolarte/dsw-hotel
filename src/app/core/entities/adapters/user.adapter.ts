import { Injectable } from '@angular/core';
import { ValidateUserResponse } from '../responses/validate-user.response';
import { ValidateUserView } from '../views/validate-user.view';
import { UserInfoResponse } from '../responses/user-info.response';
import { UserInfoView } from '../views/user-info.view';

@Injectable()
export class UserAdapter {
  constructor() {}

  validateUserResponseToValidateUserView(validateUserResponse: ValidateUserResponse): ValidateUserView {
    return {
        isValid: validateUserResponse.token ? true : false,
        message: validateUserResponse.message ?? ''
    };
  }

  UserInfoResponseToView(userInfoResponse: UserInfoResponse): UserInfoView {
    return {
      username: userInfoResponse.username,
      firstName: userInfoResponse.firstName,
      lastName: userInfoResponse.lastName,
      email: userInfoResponse.email,
      estado: userInfoResponse.estado
    }
  }
}