import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Pasajero } from './pasajero.model';
import { Viaje } from './viaje.model';
import { take, map, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  private _viajes = new BehaviorSubject<Viaje[]>([
    new Viaje(
      'v1',
      1300,
      'Quillota',
      new Date('2021-12-08T20:30'),
      'Daniela Perez',
      'XH-66-40',
      'Coupé',
      '/assets/icon/auto_mapa.jpg',
      'abc'
    ),
    new Viaje(
      'v2',
      2000,
      'San Felipe',
      new Date('2021-12-08T12:40'),
      'Jeanette Pailamilla',
      'DT-RC-78',
      'Sedán',
      '/assets/icon/auto_mapa.jpg',
      'abc'
    ),
    new Viaje(
      'v3',
      850,
      'Villa Alemana',
      new Date('2021-12-08T13:50'),
      'Javier Vivanco',
      'GK-SB-78',
      'City Car',
      '/assets/icon/auto_mapa.jpg',
      'abc'
    ),
  ]);

  private _pasajeros = new BehaviorSubject<Pasajero[]>([
    new Pasajero(
      'P1',
      'Juan Escobar',
      'Valparaíso',
      '/assets/icon/hombre1.jpeg',
      'crédito'
    ),
    new Pasajero(
      'P2',
      'Fernanda Astudillo',
      'Miraflores',
      '/assets/icon/mujer1.jpeg',
      'efectivo'
    ),
    new Pasajero(
      'P3',
      'Marcelo Gonzalez',
      'Quillota',
      '/assets/icon/hombre2.jpeg',
      'transferencia'
    ),
    new Pasajero(
      'P4',
      'Ximena Portillo',
      'Quilpué',
      '/assets/icon/mujer2.jpeg',
      'crédito'
    ),
  ]);

  get viajes() {
    return this._viajes.asObservable();
  }

  get pasajeros() {
    return this._pasajeros.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  getViaje(id: string) {
    return this.viajes.pipe(
      take(1),
      map((viajes) => ({ ...viajes.find((v) => v.id === id) }))
    );
  }

  getPasajero(id: string) {
    return this.pasajeros.pipe(
      take(1),
      map((pasajeros) => ({ ...pasajeros.find((p) => p.idUsuario === id) }))
    );
  }

  crearViaje(lugarViaje: string, costo: number, horaSalida: Date) {
    const newViaje = new Viaje(
      Math.random().toString(),
      costo,
      lugarViaje,
      horaSalida,
      this.authService.userId,
      'Javier Vivanco',
      'GK-SB-78',
      'City Car',
      '/assets/icon/auto_mapa.jpg'
    );
    return this.http
      .post(
        'https://proyecto-semestral-03-default-rtdb.firebaseio.com/viajes-disponibles.json',
        { ...newViaje, id: null }
      )
      .pipe(tap(resData => {
        console.log(resData);
      }));
    // return this.viajes.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((viajes) => {
    //     this._viajes.next(viajes.concat(newViaje));
    //   })
    // );
  }

  crearPasajero(metodoPago: string) {
    const newPasajero = new Pasajero(
      'xyz',
      'Marcelo Gonzalez',
      'Calera',
      '/assets/icon/hombre2.jpeg',
      metodoPago
    );
    return this.pasajeros.pipe(
      take(1),
      delay(1000),
      tap((pasajeros) => {
        this._pasajeros.next(pasajeros.concat(newPasajero));
      })
    );
  }

  cancelarViaje(userId: string) {
    return this.pasajeros.pipe(
      take(1),
      delay(1000),
      tap((pasajeros) => {
        this._pasajeros.next(pasajeros.filter((p) => p.idUsuario !== userId));
      })
    );
  }
}
