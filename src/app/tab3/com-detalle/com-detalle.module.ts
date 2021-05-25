import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComDetallePageRoutingModule } from './com-detalle-routing.module';

import { ComDetallePage } from './com-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComDetallePageRoutingModule
  ],
  declarations: [ComDetallePage]
})
export class ComDetallePageModule {}
