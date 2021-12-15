import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ViajesService } from '../../viajes.service';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {
  form: FormGroup;

  constructor(
    private viajesService: ViajesService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      lugar: new FormControl(null, {
        validators: [Validators.required],
      }),
      costo: new FormControl(null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.min(500),
          Validators.max(2000),
        ],
      }),
      horaSalida: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  crearViaje() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creando viaje...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.viajesService
          .crearViaje(
            this.form.value.lugar,
            this.form.value.costo,
            new Date(this.form.value.horaSalida)
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/viajes/tabs/pedir']);
          });
      });
  }
}
