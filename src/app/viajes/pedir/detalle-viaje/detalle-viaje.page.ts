import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
  isLoading = false;
  private viajeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private viajesService: ViajesService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('viajeId')) {
        this.navCtrl.navigateBack('/viajes/tabs/pedir');
        return;
      }
      this.isLoading = true;
      this.viajeSub = this.viajesService
        .getViaje(paramMap.get('viajeId'))
        .subscribe(viaje => {
          this.viaje = viaje;
          this.isLoading = false;
        },
        (error) => {
          this.alertCtrl
            .create({
              header: 'Un error ha ocurrido!',
              message: 'No se pudo cargar el viaje',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.router.navigate(['/viajes/tabs/pedir']);
                  },
                },
              ],
            })
            .then((alertEl) => alertEl.present());
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
