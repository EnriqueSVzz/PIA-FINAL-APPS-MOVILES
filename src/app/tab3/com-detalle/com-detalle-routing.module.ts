import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComDetallePage } from './com-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ComDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComDetallePageRoutingModule {}
