import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesPage } from './viajes.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ViajesPage,
    children: [
      {
        path: 'pedir',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pedir/pedir.module').then((m) => m.PedirPageModule),
          },
          {
            path: ':viajeId',
            loadChildren: () =>
              import('./pedir/detalle-viaje/detalle-viaje.module').then(
                (m) => m.DetalleViajePageModule
              ),
          }
        ],
      },
      {
        path: 'crear',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./crear/agendar.module').then((m) => m.AgendarPageModule),
          },
          {
            path: 'nuevo',
            loadChildren: () =>
              import('./crear/crear-viaje/crear-viaje.module').then(
                (m) => m.CrearViajePageModule
              ),
          },
          {
            path: ':pasajeroId',
            loadChildren: () =>
              import('./crear/detalle-pasajero/detalle-pasajero.module').then(
                (m) => m.DetallePasajeroPageModule
              ),
          },
        ],
      },
      { path: '', redirectTo: '/viajes/tabs/pedir', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/viajes/tabs/pedir', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesPageRoutingModule {}
