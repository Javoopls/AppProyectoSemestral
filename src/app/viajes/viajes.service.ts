import { Injectable } from '@angular/core';
import { Pasajero } from './pasajero.model';
import { Viaje } from './viaje.model';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  private _viajes: Viaje[] = [
    new Viaje(
      'v1',
      1300,
      'Quillota',
      new Date('2021-12-08'),
      'u1',
      'Daniela Perez',
      'XH-66-40',
      'Coupé',
      '/assets/icon/auto_mapa.jpg'
    ),
    new Viaje(
      'v2',
      2000,
      'San Felipe',
      new Date('2021-12-08'),
      'u1',
      'Jeanette Pailamilla',
      'DT-RC-78',
      'Sedán',
      '/assets/icon/auto_mapa.jpg'
    ),
    new Viaje(
      'v3',
      850,
      'Villa Alemana',
      new Date('2021-12-08'),
      'u1',
      'Daniela Perez',
      'GK-SB-78',
      'City Car',
      '/assets/icon/auto_mapa.jpg'
    ),
  ];

  get viajes() {
    return [...this._viajes];
  }

  private _pasajeros: Pasajero[] = [
    new Pasajero(
      'P1',
      'Juan',
      'Escobar',
      'Valparaíso',
      '/assets/icon/hombre1.jpeg',
      'crédito'
    ),
    new Pasajero(
      'P2',
      'Fernanda',
      'Astudillo',
      'Miraflores',
      '/assets/icon/mujer1.jpeg',
      'efectivo'
    ),
    new Pasajero(
      'P3',
      'Marcelo',
      'Gonzalez',
      'Quillota',
      '/assets/icon/hombre2.jpeg',
      'transferencia'
    ),
    new Pasajero(
      'P4',
      'Ximena',
      'Portillo',
      'Quilpué',
      '/assets/icon/mujer2.jpeg',
      'crédito'
    )
  ];

  get pasajeros(){
    return [...this._pasajeros];
  }

  constructor() {}
}
