import { Ubicacion } from './pedir/ubicacion.model';

export class Pasajero {
  constructor(
    public idUsuario: string,
    public nombre: string,
    public lugarViaje: Ubicacion,
    public pasajeroImg: string,
    public metodoPago: string
  ) {}
}
