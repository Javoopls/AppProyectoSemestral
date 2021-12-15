import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Viaje } from '../../viaje.model';
import { ViajesService } from '../../viajes.service';

@Component({
  selector: 'app-pedir-viaje',
  templateUrl: './pedir-viaje.component.html',
  styleUrls: ['./pedir-viaje.component.scss'],
})
export class PedirViajeComponent implements OnInit {
  @Input() viajeSeleccionado: Viaje;
  // @ViewChild('f', {static: true}) form: NgForm;
  form: FormGroup;

  constructor(
    private viajesService: ViajesService,
    private modalCtrl: ModalController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      lugar: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      metodoPago: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }

  pedirViaje() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Solicitando un viaje...'
    }).then(loadingEl => {
      loadingEl.present();
      this.viajesService.crearPasajero(
        this.form.value.lugar,
        this.form.value.metodoPago
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.modalCtrl.dismiss();
        this.router.navigate(['/viajes/tabs/crear']);
      });
    });
  }

  valFormulario() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss({
      datosViaje: {
        metodoPago: this.form.value.metodoPago,
      },
    });
  }
}
