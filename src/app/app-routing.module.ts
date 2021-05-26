import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    //ROUTEO HACIA LA PAGINA DE PELIS-DETALLE DONDE SE ENCUENTRA MÁS INFROMACION DE LA BUSQUEDA SELECCIONADA
    path: 'peli/:id',
    loadChildren: () => import('./tab1/peli-detalle/peli-detalle.module').then( m => m.PeliDetallePageModule)
  },
  {
     //ROUTEO HACIA LA PAGINA DE AGREGAR COMENTARIOS DONDE SE ENCUENTRA EL FORMULARIO
    path: 'Agregar_com',
    loadChildren: () => import('./tab3/com-detalle/com-detalle.module').then( m => m.ComDetallePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
