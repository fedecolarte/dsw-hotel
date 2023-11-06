import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoClient } from '@app/core/entities/views/info-client.view';
import { ValidateUserView } from '@app/core/entities/views/validate-user.view';
import { StepperService } from '@app/core/services/stepper.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss']
})
export class StepFormComponent implements OnInit {
  formulario: FormGroup;
  isValid: boolean = false;
  @Output() goNextStep = new EventEmitter<any>();


  constructor(private fb: FormBuilder, private stepperService: StepperService) {
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
    this.stepperService.stepTwo$.pipe(take(1)).subscribe(infoClient => {
      if(infoClient !== null){
        this.formulario.patchValue({
          nombre: infoClient.name,
          apellido: infoClient.surname,
          genero: infoClient.gender,
          dni: infoClient.documentNumber,
          direccion: infoClient.direction,
          piso: infoClient?.floor,
          depto: infoClient?.departament,
          telefono: infoClient.cellphone,
          nacimiento: infoClient.birthdate,
          pais: infoClient.country,
          localidad: infoClient.location,
          email: infoClient.email
        })
      } 
    })
  }
  
  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulario válido, datos enviados:');
      console.log(this.formulario.value);
    } else {
      console.log('Formulario inválido, por favor, corrija los errores.');
    }
  }

  goBack(): void {
    
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

    this.stepperService.saveStepTwo(infoClient);
    this.goNextStep.emit(true);
  }
}
