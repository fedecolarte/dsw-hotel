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
  userValidation: ValidateUserView = {
    isValid: true,
    message: ''
  };

  isValid: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbActiveModal,
    public userService: UserService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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

  loginValidator(): void {
    this.userService.validateUser(this.loginFormValue).subscribe(validationResponse => {
      this.userValidation = validationResponse;
      if(!this.userValidation.isValid) this.loginForm.setErrors({ 'loginValidator': !this.userValidation.isValid });
      else {
        this.isValid = true;
        this.userService.setUserLogged(this.loginFormValue.username);
        setTimeout(() => {
          this.modalService.close();
        },600)
      }
    });
  }

  close(): void {
    this.modalService.dismiss();
  }
}
