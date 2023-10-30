import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateUserView } from '@app/core/entities/views/validate-user.view';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss']
})
export class StepFormComponent implements OnInit {
  formulario: FormGroup;
  isValid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      piso: ['', Validators.required],
      depto: ['', Validators.required],
      telefono: ['', Validators.required],
      nacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      localidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
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
  
}
