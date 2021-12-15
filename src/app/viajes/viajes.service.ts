import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Pasajero } from './pasajero.model';
import { Viaje } from './viaje.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface DatosViaje {
  autoImg: string;
  costo: number;
  horaSalida: string;
  idUsuario: string;
  lugarViaje: string;
  modeloVehiculo: string;
  nombreConductor: string;
  patenteVehiculo: string;
}

interface DatosPasajero {
  idUsuario: string;
  lugarViaje: string;
  metodoPago: string;
  nombre: string;
  pasajeroImg: string;
}

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

  fetchViajes() {
    return this.http
      .get<{ [key: string]: DatosViaje }>(
        'https://proyecto-semestral-03-default-rtdb.firebaseio.com/viajes-disponibles.json'
      )
      .pipe(
        map((resData) => {
          const viajes = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              viajes.push(
                new Viaje(
                  key,
                  resData[key].costo,
                  resData[key].lugarViaje,
                  new Date(resData[key].horaSalida),
                  resData[key].nombreConductor,
                  resData[key].patenteVehiculo,
                  resData[key].modeloVehiculo,
                  resData[key].autoImg,
                  resData[key].idUsuario
                )
              );
            }
          }
          return viajes;
          // return [];
        }),
        tap((viajes) => {
          this._viajes.next(viajes);
        })
      );
  }

  fetchPasajeros() {
    return this.http
      .get<{ [key: string]: DatosPasajero }>(
        'https://proyecto-semestral-03-default-rtdb.firebaseio.com/pasajeros-disponibles.json'
      )
      .pipe(
        map((resData) => {
          const pasajeros = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              pasajeros.push(
                new Pasajero(
                  key,
                  resData[key].nombre,
                  resData[key].lugarViaje,
                  resData[key].pasajeroImg,
                  resData[key].metodoPago
                )
              );
            }
          }
          return pasajeros;
        }),
        tap((pasajeros) => {
          this._pasajeros.next(pasajeros);
        })
      );
  }

  getViaje(id: string) {
    return this.http
      .get<DatosViaje>(
        `https://proyecto-semestral-03-default-rtdb.firebaseio.com/viajes-disponibles/${id}.json`
      )
      .pipe(
        map(
          (viajeData) =>
            new Viaje(
              id,
              viajeData.costo,
              viajeData.lugarViaje,
              new Date(viajeData.horaSalida),
              viajeData.nombreConductor,
              viajeData.patenteVehiculo,
              viajeData.modeloVehiculo,
              viajeData.autoImg,
              viajeData.idUsuario
            )
        )
      );
  }

  getPasajero(id: string) {
    return this.http
      .get<DatosPasajero>(
        `https://proyecto-semestral-03-default-rtdb.firebaseio.com/pasajeros-disponibles/${id}.json`
      )
      .pipe(
        map(
          (pasajeroData) =>
            new Pasajero(
              id,
              pasajeroData.nombre,
              pasajeroData.lugarViaje,
              pasajeroData.pasajeroImg,
              pasajeroData.metodoPago
            )
        )
      );
  }

  crearViaje(lugarViaje: string, costo: number, horaSalida: Date) {
    let idGenerada: string;
    const newViaje = new Viaje(
      Math.random().toString(),
      costo,
      lugarViaje,
      horaSalida,
      'Javier Vivanco',
      'GK-SB-78',
      'City Car',
      '/assets/icon/auto_mapa.jpg',
      this.authService.userId
    );
    return this.http
      .post<{ name: string }>(
        'https://proyecto-semestral-03-default-rtdb.firebaseio.com/viajes-disponibles.json',
        { ...newViaje, id: null }
      )
      .pipe(
        switchMap((resData) => {
          idGenerada = resData.name;
          return this.viajes;
        }),
        take(1),
        tap((viajes) => {
          newViaje.id = idGenerada;
          this._viajes.next(viajes.concat(newViaje));
        })
      );
    // return this.viajes.pipe(
    //   take(1),
    //   delay(1000),
    //
    // );
  }

  crearPasajero(lugar: string, metodoPago: string) {
    const newPasajero = new Pasajero(
      'xyz',
      'Marcelo Gonzalez',
      lugar,
      '/assets/icon/hombre2.jpeg',
      metodoPago
    );
    return this.http
      .post<{ name: string }>(
        'https://proyecto-semestral-03-default-rtdb.firebaseio.com/pasajeros-disponibles.json',
        { ...newPasajero, id: null }
      )
      .pipe(
        tap((resData) => {
          console.log(resData);
        })
      );
    // return this.pasajeros.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((pasajeros) => {
    //     this._pasajeros.next(pasajeros.concat(newPasajero));
    //   })
    // );
  }

  cancelarViaje(userId: string) {
    return this.http
      .delete(
        `https://proyecto-semestral-03-default-rtdb.firebaseio.com/pasajeros-disponibles/${userId}.json`
      )
      .pipe(
        switchMap(() => this.pasajeros),
        take(1),
        tap((pasajeros) => {
          this._pasajeros.next(pasajeros.filter((p) => p.idUsuario !== userId));
        })
      );
  }
}
