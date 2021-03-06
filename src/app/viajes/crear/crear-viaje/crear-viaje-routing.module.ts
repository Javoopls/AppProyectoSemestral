import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { CrearViajePage } from './crear-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: CrearViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class CrearViajePageRoutingModule {}
