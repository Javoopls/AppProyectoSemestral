import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Pasajero } from '../pasajero.model';
import { ViajesService } from '../viajes.service';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit, OnDestroy {
  cargarPasajeros: Pasajero[];
  private pasajerosSub: Subscription;

  constructor(private viajesService: ViajesService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.pasajerosSub = this.viajesService.pasajeros.subscribe(pasajeros => {
      this.cargarPasajeros = pasajeros;
    });
  }

  ngOnDestroy(){
    if (this.pasajerosSub) {
      this.pasajerosSub.unsubscribe();
    }
  }

  cancelarViaje(pasajeroId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    this.loadingCtrl.create({message: 'Borrando Viaje...'}).then(loadingEl =>{
      loadingEl.present();
      this.viajesService.cancelarViaje(pasajeroId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
    //borrar historial
  }
}
