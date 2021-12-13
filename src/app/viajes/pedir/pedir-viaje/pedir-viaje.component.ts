import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Viaje } from '../../viaje.model';

@Component({
  selector: 'app-pedir-viaje',
  templateUrl: './pedir-viaje.component.html',
  styleUrls: ['./pedir-viaje.component.scss'],
})
export class PedirViajeComponent implements OnInit {
  @Input() viajeSeleccionado: Viaje;
  @ViewChild('f', {static: true}) form: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrar(){
    this.modalCtrl.dismiss(null, 'cancelar');
  }

  crearViaje(){
    this.modalCtrl.dismiss({message: 'Prueba'}, 'Confirmar');
  }

  valFormulario(){
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss({
      datosViaje: {
        metodoPago: this.form.value.metodoPago
      }
    });

  }

}
