import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'viajes', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule) },
  { path: 'viajes', loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule), canLoad: [AuthGuard] },
  { path: 'password', loadChildren: () => import('./auth/password/password.module').then( m => m.PasswordPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
