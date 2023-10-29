import { Injectable } from '@angular/core';
import { ValidateUserResponse } from '../responses/validate-user.response';
import { ValidateUserView } from '../views/validate-user.view';

@Injectable()
export class UserAdapter {
  constructor() {}

  validateUserResponseToValidateUserView(validateUserResponse: ValidateUserResponse): ValidateUserView {
    return {
        isValid: validateUserResponse.token ? true : false,
        message: validateUserResponse.message ?? ''
    };
  }
}