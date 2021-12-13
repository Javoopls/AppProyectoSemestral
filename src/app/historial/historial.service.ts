import { Injectable } from '@angular/core';
import { Historial } from './historial.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private _historial: Historial[] = [
    {
      idViaje: 'V1',
      lugarViaje: 'Santa Julia',
      fechaViaje: new Date ('2021-12-08'),
      valorViaje: 550,
      nombreConductor: 'Pablo Martinez',
      patenteVehículo: 'BZ-54-43'
    }
  ];

  get historial(){
    return [...this._historial];
  }

  constructor() { }
}
