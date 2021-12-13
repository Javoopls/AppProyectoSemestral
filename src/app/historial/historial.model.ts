export class Historial {
  constructor(
    public idViaje: string,
    public lugarViaje: string,
    public fechaViaje: Date,
    public valorViaje: number,
    public nombreConductor: string,
    public patenteVehículo: string,
  ) {}
}
