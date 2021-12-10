import { Component, OnInit } from '@angular/core';
import { Pasajero } from '../pasajero.model';
import { ViajesService } from '../viajes.service';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit {
  cargarPasajeros: Pasajero[];

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {
    this.cargarPasajeros = this.viajesService.pasajeros;
  }

}
