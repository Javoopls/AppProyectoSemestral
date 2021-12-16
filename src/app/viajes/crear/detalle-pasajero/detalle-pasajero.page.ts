import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';
import { Pasajero } from '../../pasajero.model';
import { ViajesService } from '../../viajes.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-detalle-pasajero',
  templateUrl: './detalle-pasajero.page.html',
  styleUrls: ['./detalle-pasajero.page.scss'],
})
export class DetallePasajeroPage implements OnInit, OnDestroy {
  pasajero: Pasajero;
  isLoading = false;
  public correo: 'ja.vivancoa@duocuc.cl';
  private pasajeroSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private viajesService: ViajesService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router,
    private modalCtrl: ModalController,
    private emailComposer: EmailComposer
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

  openEmailComposer() {
    const email = {
      to: this.correo,
      subject: 'Viaje Solicitado',
      body:
        this.pasajero.idUsuario +
        ' ' +
        this.pasajero.nombre +
        ' ' +
        this.pasajero.lugarViaje +
        ' ' +
        this.pasajero.pasajeroImg +
        ' ' +
        this.pasajero.metodoPago
    };
    this.emailComposer.open(email);
  }

  tomarPasajero(id) {
    this.viajesService.getPasajero(id);
    this.openEmailComposer();
    this.alertCtrl
              .create({
                header: 'Tomando pasajero...',
                message: 'Se ha enviado un correo con los datos de su viaje!',
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
