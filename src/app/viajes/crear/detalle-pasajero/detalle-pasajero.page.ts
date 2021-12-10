import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-pasajero',
  templateUrl: './detalle-pasajero.page.html',
  styleUrls: ['./detalle-pasajero.page.scss'],
})
export class DetallePasajeroPage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  tomarPasajero(){
    this.navCtrl.navigateBack('/viajes/tabs/crear');
  }

}
