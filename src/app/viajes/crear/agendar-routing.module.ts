import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendarPage } from './agendar.page';

const routes: Routes = [
  {
    path: '',
    component: AgendarPage
  },
  {
    path: 'detalle-pasajero',
    loadChildren: () => import('./detalle-pasajero/detalle-pasajero.module').then( m => m.DetallePasajeroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarPageRoutingModule {}
