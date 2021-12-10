import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendarPageRoutingModule } from './agendar-routing.module';

import { AgendarPage } from './agendar.page';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendarPageRoutingModule,
    MatCardModule
  ],
  declarations: [AgendarPage]
})
export class AgendarPageModule {}
