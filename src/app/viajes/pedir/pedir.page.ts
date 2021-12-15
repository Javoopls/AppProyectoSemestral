import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Viaje } from '../viaje.model';
import { ViajesService } from '../viajes.service';
import { PedirViajeComponent } from './pedir-viaje/pedir-viaje.component';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit, OnDestroy {
  cargarViajes: Viaje[];
  viaje: Viaje;
  viajesRelevantes: Viaje[];
  isLoading = false;
  private viajesSub: Subscription;

  constructor(
    private viajesServices: ViajesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
  ) {}

  ngOnInit() {
    this.viajesSub = this.viajesServices.viajes.subscribe(viajes => {
      this.cargarViajes = viajes;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.viajesServices.fetchViajes().subscribe(() => {
      this.isLoading = false;
    });
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
        if (resultData.role === 'confirm') {
          console.log('Viaje Solicitado');
        }
      });
  }

  // filtroViajes(){
  //   this.viajesRelevantes = this.cargarViajes.filter(
  //     viaje => viaje.idUsuario !== this.authService.userId
  //   );
  //   this.cargarViajes = this.viajesRelevantes.slice(1);
  // }

  ngOnDestroy() {
      if (this.viajesSub) {
        this.viajesSub.unsubscribe();
      }
  }
}
