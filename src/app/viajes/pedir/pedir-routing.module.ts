import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { PedirPage } from './pedir.page';

const routes: Routes = [
  {
    path: '',
    component: PedirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class PedirPageRoutingModule {}
