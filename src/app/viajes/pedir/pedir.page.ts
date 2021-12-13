import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Viaje } from '../viaje.model';
import { ViajesService } from '../viajes.service';
import { PedirViajeComponent } from './pedir-viaje/pedir-viaje.component';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {
  cargarViajes: Viaje[];
  viaje: Viaje;

  constructor(
    private viajesServices: ViajesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.cargarViajes = this.viajesServices.viajes;
  }

  pedirViaje() {
    this.actionSheetCtrl.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Pedir Viaje',
          handler: () => {
            this.abrirModal('select');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  abrirModal(mode: 'select'){
    console.log(mode);
    this.modalCtrl
      .create({
        component: PedirViajeComponent,
        componentProps: { viajeSeleccionado: this.viaje },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'Confirmar') {
          console.log('Viaje Solicitado');
        }
      });
  }
}
