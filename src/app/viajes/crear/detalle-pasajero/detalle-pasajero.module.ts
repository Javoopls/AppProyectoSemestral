import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePasajeroPageRoutingModule } from './detalle-pasajero-routing.module';

import { DetallePasajeroPage } from './detalle-pasajero.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePasajeroPageRoutingModule,
    SharedModule
  ],
  declarations: [DetallePasajeroPage]
})
export class DetallePasajeroPageModule {}
