import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Viaje } from '../../viaje.model';
import { ViajesService } from '../../viajes.service';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  viaje: Viaje;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private viajesService: ViajesService
  ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap => {
    //   if (!paramMap.has('viajeId')) {
    //     this.navCtrl.navigateBack('/viajes/tabs/pedir');
    //     return;
    //   }
    //   this.viaje = this.viajesService.getViaje(paramMap.get('viajeId'));
    // });
  }

  viajePedido() {
    this.navCtrl.navigateBack('/viajes/tabs/pedir');
  }
}
