import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Viaje } from '../../viaje.model';
import { ViajesService } from '../../viajes.service';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit, OnDestroy {
  viaje: Viaje;
  private viajeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private viajesService: ViajesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('viajeId')) {
        this.navCtrl.navigateBack('/viajes/tabs/pedir');
        console.log(paramMap);
      }
      this.viajeSub = this.viajesService
        .getViaje(paramMap.get('viajeId'))
        .subscribe(viaje => {
          this.viaje = viaje;
        });
    });
  }

  viajePedido() {
    this.navCtrl.navigateBack('/viajes/tabs/pedir');
  }

  ngOnDestroy() {
    if (this.viajeSub) {
      this.viajeSub.unsubscribe();
    }
  }
}
