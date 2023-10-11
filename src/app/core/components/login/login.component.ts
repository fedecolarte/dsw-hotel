import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      documentType: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      validatePassword: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  openRegister(): void {
    this.userService.setRegisterMode(true);
  }

  openLogin(): void {
    this.userService.setRegisterMode(false);
  }

  close(): void {
    this.modalService.dismiss();
  }
}
