import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Viaje } from '../../viaje.model';

@Component({
  selector: 'app-pedir-viaje',
  templateUrl: './pedir-viaje.component.html',
  styleUrls: ['./pedir-viaje.component.scss'],
})
export class PedirViajeComponent implements OnInit {
  @Input() viajeSeleccionado: Viaje;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrar(){
    this.modalCtrl.dismiss(null, 'cancelar');
  }

  crearViaje(){
    this.modalCtrl.dismiss({message: 'Prueba'}, 'Confirmar');
  }

}
