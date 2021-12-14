import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Pasajero } from '../../pasajero.model';
import { ViajesService } from '../../viajes.service';

@Component({
  selector: 'app-detalle-pasajero',
  templateUrl: './detalle-pasajero.page.html',
  styleUrls: ['./detalle-pasajero.page.scss'],
})
export class DetallePasajeroPage implements OnInit, OnDestroy {
  pasajero: Pasajero;
  private pasajeroSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private viajesService: ViajesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pasajeroId')) {
        this.navCtrl.navigateBack('/viajes/tabs/crear');
        console.log(paramMap);
      }
      this.pasajeroSub = this.viajesService
        .getPasajero(paramMap.get('pasajeroId'))
        .subscribe(pasajero => {
          this.pasajero = pasajero;
        });
    });
  }

  tomarPasajero() {
    this.navCtrl.navigateBack('/viajes/tabs/crear');
  }

  ngOnDestroy() {
      if (this.pasajeroSub) {
        this.pasajeroSub.unsubscribe();
      }
  }
}
