import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PedirPageRoutingModule } from './pedir-routing.module';
import { PedirPage } from './pedir.page';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirPageRoutingModule,
    MatCardModule
  ],
  declarations: [PedirPage]
})
export class PedirPageModule {}
