import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      lugar: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      valor: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(500), Validators.max(2000)]
      }),
      horaSalida: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  crearViaje(){
    console.log(this.form);
  }

}
