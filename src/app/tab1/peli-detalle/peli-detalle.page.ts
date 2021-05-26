import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peliservice } from 'src/app/Services/pelis.service';

@Component({
  selector: 'app-peli-detalle',
  templateUrl: './peli-detalle.page.html',
  styleUrls: ['./peli-detalle.page.scss'],
})
export class PeliDetallePage implements OnInit {


  //EN ESTA VARIABLE VAMOS A GUARDAR LOS DATOS DE LA API TEMPORALMENTE
  content: object = null;

  constructor
  (
    private peliServices: Peliservice,
    private activedRoute: ActivatedRoute
  ) { }


    // SE CARGA DE LA OPCIÓN SELECCIONADA ANTERIORMENTE EN LA BUSQUEDA
    //PARA TRAERNOS MÁS INFORMACIÓN DE LA MISMA

  ngOnInit()
  {
    console.log('peli-detalle');
    let id = this.activedRoute.snapshot.paramMap.get('id');
	  this.peliServices.getDetails(id).subscribe(results => this.content = results);
  }

}
