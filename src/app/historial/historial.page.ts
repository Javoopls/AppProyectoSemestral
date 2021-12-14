import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Historial } from './historial.model';
import { HistorialService } from './historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  cargarHistorial: Historial[];

  constructor(private historialService: HistorialService) { }

  ngOnInit() {
    // this.cargarHistorial = this.historialService.historial;
  }

  borrarHistorial(viajeId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    //borrar historial
  }

}
