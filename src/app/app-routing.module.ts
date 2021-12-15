import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'viajes', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule) },
  { path: 'viajes', loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule), canLoad: [AuthGuard] },
  { path: 'historial', loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule), canLoad: [AuthGuard] },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule), canLoad: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
