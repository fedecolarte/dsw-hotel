import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUserRequest } from '@app/core/entities/requests/register-user.request';
import { ValidateUserView } from '@app/core/entities/views/validate-user.view';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  registerValidation: ValidateUserView = {
    isValid: true,
    message: ''
  }

  isCreated: boolean = false;

  isRegistered: boolean = false;

    constructor(
      private formBuilder: FormBuilder,
      public userService: UserService
      ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      validatePassword: ['', Validators.required]
    })
   }

   get registerFormValue() {
    return this.registerForm.value;
  }

  get registerFormStatus() {
    return this.registerForm.status;
  }

  registerPerson(): void {
    const pwSame: boolean = this.isPasswordSame();
    if(pwSame) {
      const payload: RegisterUserRequest = {
        username: this.registerFormValue.username,
        password: this.registerFormValue.password,
        firstName: this.registerFormValue.firstName, 
        lastName: this.registerFormValue.lastName,
        email: this.registerFormValue.email,
        documento: this.registerFormValue.documentNumber
      }
      this.userService.registerUser(payload).subscribe(response => {
        if(response) {
          this.isRegistered = true;
          this.registerValidation = {
            isValid: true,
            message: ''
          };

          this.isCreated = true;

          setTimeout(() => {
            this.openLogin();
          }, 500);
        } 
        else {
          this.registerForm.setErrors({ 'passwordValidation': true });
          this.registerValidation = {
            isValid: false,
            message: 'Los campos son invalidos'
          };
        }
      })
    }
  }

  isPasswordSame(): boolean {
    if(this.registerFormValue.password !== this.registerFormValue.validatePassword) {
      this.registerForm.setErrors({ 'passwordValidation': true });
      this.registerValidation = {
        isValid: false,
        message: 'Las contraseñas no coinciden'
      };

      return false;
    }
    else {
      this.registerValidation = {
        isValid: true,
        message: ''
      };
      return true;
    } 
  }

  openLogin(): void {
    this.userService.setRegisterMode(false);
  }

  ngOnInit(): void {
  }

}
