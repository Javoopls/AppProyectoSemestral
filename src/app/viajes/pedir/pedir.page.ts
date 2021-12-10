import { Component, OnInit } from '@angular/core';
import { Viaje } from '../viaje.model';
import { ViajesService } from '../viajes.service';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {
  cargarViajes: Viaje[];

  constructor(private viajesServices: ViajesService) { }

  ngOnInit() {
    this.cargarViajes = this.viajesServices.viajes;
  }

}
