import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje } from './viaje.model';
import { ViajesService } from './viajes.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  viajes: Viaje[];

  constructor(private viajesService: ViajesService, private router: Router) { }

  ngOnInit() {
    this.viajesService.viajes.subscribe(viajes => {
      this.viajes = viajes;
    });
  }

}
