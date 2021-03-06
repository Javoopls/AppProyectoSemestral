import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { Ubicacion } from 'src/app/viajes/pedir/ubicacion.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() ubicacionPick = new EventEmitter<Ubicacion>();
  imgUbicacion: string;
  isLoading = false;

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {}

  elegirUbicacion() {
    this.modalCtrl.create({ component: MapModalComponent }).then((modalEl) => {
      modalEl.onDidDismiss().then((modalData) => {
        if (!modalData.data) {
          return;
        }
        const lugarPickeado: Ubicacion = {
          lat: modalData.data.lat,
          lng: modalData.data.lng,
          direccion: null,
          imgMapa: null,
        };
        this.isLoading = true;
        this.obtDireccion(modalData.data.lat, modalData.data.lng).pipe(
          switchMap((direccion) => {
            lugarPickeado.direccion = direccion;
            return of(this.getImagenMapa(lugarPickeado.lat, lugarPickeado.lng, 16));
          })
        ).subscribe(imagenMapa => {
          lugarPickeado.imgMapa = imagenMapa;
          this.imgUbicacion = imagenMapa;
          this.isLoading = false;
          this.ubicacionPick.emit(lugarPickeado);
        });
      });
      modalEl.present();
    });
  }

  private obtDireccion(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map((geoData) => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getImagenMapa(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:blue%7Clabel:Lugar%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`;
  }
}
