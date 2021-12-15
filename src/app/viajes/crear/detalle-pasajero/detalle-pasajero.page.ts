import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';
import { Pasajero } from '../../pasajero.model';
import { ViajesService } from '../../viajes.service';

@Component({
  selector: 'app-detalle-pasajero',
  templateUrl: './detalle-pasajero.page.html',
  styleUrls: ['./detalle-pasajero.page.scss'],
})
export class DetallePasajeroPage implements OnInit, OnDestroy {
  pasajero: Pasajero;
  isLoading = false;
  private pasajeroSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private viajesService: ViajesService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pasajeroId')) {
        this.navCtrl.navigateBack('/viajes/tabs/crear');
        return;
      }
      this.isLoading = true;
      this.pasajeroSub = this.viajesService
        .getPasajero(paramMap.get('pasajeroId'))
        .subscribe(pasajero => {
          this.pasajero = pasajero;
          this.isLoading = false;
        },
        (error) => {
          this.alertCtrl
            .create({
              header: 'Un error ha ocurrido!',
              message: 'No se pudo cargar el pasajero',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.router.navigate(['/viajes/tabs/crear']);
                  },
                },
              ],
            })
            .then((alertEl) => alertEl.present());
        });
    });
  }

  tomarPasajero() {
    this.navCtrl.navigateBack('/viajes/tabs/crear');
  }

  mostrarMapa() {
    this.modalCtrl.create({component: MapModalComponent, componentProps: {
      center: {lat: this.pasajero.lugarViaje.lat, lng: this.pasajero.lugarViaje.lng },
      selectable: false,
      closeButtonText: 'Cerrar',
      title: this.pasajero.lugarViaje.direccion
    } }).then(modalEl => {
      modalEl.present();
    });
  }

  ngOnDestroy() {
      if (this.pasajeroSub) {
        this.pasajeroSub.unsubscribe();
      }
  }
}
