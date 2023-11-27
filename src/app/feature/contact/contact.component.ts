import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  async send() {
    emailjs.init("3cHrz8zvT5xILHT90")
     let response = await emailjs.send("service_okya4sd","template_s6685pb",{
       email: this.form.value.email,
       message: this.form.value.message,
      });
    alert('Mensaje enviado, pronto recibiras respuesta!');
    this.form.reset();
  }

}
