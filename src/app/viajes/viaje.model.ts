import { Ubicacion } from './pedir/ubicacion.model';

export class Viaje {
  constructor(
    public id: string,
    public costo: number,
    public lugarViaje: Ubicacion,
    public horaSalida: Date,
    public nombreConductor: string,
    public patenteVehiculo: string,
    public modeloVehiculo: string,
    public autoImg: string,
    public idUsuario: string
  ) {}
}
