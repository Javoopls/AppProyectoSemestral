import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Historial } from './historial.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private _historial = new BehaviorSubject<Historial[]>([]);

  get historial(){
    return this._historial.asObservable();
  }

  constructor() { }

  anadirHistorial(viajeId: string, lugarViaje: string, metodoPago: string){

  }

  eliminarHistorial(){

  }
}
