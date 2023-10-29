import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUserRequest } from '@app/core/entities/requests/register-user.request';
import { ValidateUserView } from '@app/core/entities/views/validate-user.view';
import { UserService } from '@app/core/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  userValidation: ValidateUserView = {
    isValid: true,
    message: ''
  };

  registerValidation: ValidateUserView = {
    isValid: true,
    message: ''
  }

  isValid: boolean = false;

  isRegistered: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbActiveModal,
    public userService: UserService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

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


  get loginFormValue() {
    return this.loginForm.value;
  }

  get loginFormStatus() {
    return this.loginForm.status;
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void { }

  openRegister(): void {
    this.userService.setRegisterMode(true);
  }

  openLogin(): void {
    this.userService.setRegisterMode(false);
  }

  loginValidator(): void {
    this.userService.validateUser(this.loginFormValue).subscribe(validationResponse => {
      this.userValidation = validationResponse;
      if(!this.userValidation.isValid) this.loginForm.setErrors({ 'loginValidator': !this.userValidation.isValid });
      else {
        this.isValid = true;
        this.userService.setUserLogged(this.loginFormValue.username, true);
        setTimeout(() => {
          this.modalService.close();
        },600)
      }
    });
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

  close(): void {
    this.modalService.dismiss();
  }
}
