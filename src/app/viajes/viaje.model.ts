export class Viaje {
  constructor(
    public viajeId: string,
    public costo: number,
    public lugarViaje: string,
    public horaSalida: Date,
    public idUsuario: string,
    public nombreConductor: string,
    public patenteVehiculo: string,
    public modeloVehiculo: string,
    public autoImg: string
  ) {}
};
