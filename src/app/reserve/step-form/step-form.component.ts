import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeAnimation } from '@app/core/animations/fade.animation';
import { InfoClient } from '@app/core/entities/views/info-client.view';
import { ClientService } from '@app/core/services/client.service';
import { StepperService } from '@app/core/services/stepper.service';
import { UserService } from '@app/core/services/user.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, take } from 'rxjs';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss'],
  animations: [fadeAnimation]
})
export class StepFormComponent implements OnInit {
  formulario: FormGroup;
  isValid: boolean = false;
  @Output() goNextStep = new EventEmitter<any>();
  @Output() goPrevStep = new EventEmitter<any>();


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private stepperService: StepperService,
    public userService: UserService,
    public clientService: ClientService
    ) {

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      piso: [''],
      depto: [''],
      telefono: ['', Validators.required],
      nacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      localidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get formValue() {
    return this.formulario.value;
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.userLogged$.pipe(
      concatMap((user) => this.userService.getUserInfo(user)),
       take(1)).
       subscribe(userInfo => {
          if(userInfo) {
            this.formulario.patchValue({
              nombre: userInfo.firstName,
              apellido: userInfo.lastName,
              email: userInfo.email,
              dni: userInfo.documentNumber
            })

            this.getClientInfo(userInfo.documentNumber);
          }
        }
       )
  }

  getClientInfo(documentNumber: string): void {
    this.clientService.GetClientInfo(documentNumber).pipe(
      take(1),
    ).subscribe((clientInfo => {
      const date: Date = new Date(clientInfo.birthdate!);
      const birthDate: NgbDate | null = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate() + 1)
      
      this.formulario.patchValue({
        genero: clientInfo.gender ?? '',
        direccion: clientInfo.direction ?? '',
        piso: clientInfo.floor ?? '',
        depto: clientInfo.department ?? '',
        telefono: clientInfo.telphone ?? '',
        nacimiento: birthDate ?? '',
        pais: clientInfo.country ?? '',
        localidad: clientInfo.locality ?? '',
      })
    }))
  }
  
  goBack(): void {
    this.goPrevStep.emit(true);
  }


  saveStep(): void {
    const infoClient: InfoClient = {
      name: this.formValue.nombre,
      surname: this.formValue.apellido,
      gender: this.formValue.genero,
      documentNumber: this.formValue.dni,
      direction: this.formValue.direccion,
      floor: this.formValue.piso,
      departament: this.formValue.depto,
      cellphone: this.formValue.telefono,
      birthdate: this.formValue.nacimiento,
      country: this.formValue.pais,
      location: this.formValue.localidad,
      email: this.formValue.email
    }

    this.clientService.updateClientInfo(infoClient).subscribe();
    this.stepperService.saveStepTwo(infoClient);
    this.goNextStep.emit(true);
  }
}
