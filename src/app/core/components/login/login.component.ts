import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      suranme: ['', Validators.required],
      telNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      validatePassword: ['', Validators.required]
    })
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

  ngOnInit(): void {
    console.log(this.loginForm);
  }

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

  close(): void {
    this.modalService.dismiss();
  }
}
