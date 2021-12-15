import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PedirPageRoutingModule } from './pedir-routing.module';
import { PedirPage } from './pedir.page';
import { MatCardModule } from '@angular/material/card';
import { PedirViajeComponent } from './pedir-viaje/pedir-viaje.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PedirPageRoutingModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    SharedModule
  ],
  declarations: [PedirPage, PedirViajeComponent]
})
export class PedirPageModule {}
