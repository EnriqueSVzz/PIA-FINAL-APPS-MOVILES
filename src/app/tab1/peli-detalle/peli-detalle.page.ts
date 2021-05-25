import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peliservice } from 'src/app/Services/pelis.service';

@Component({
  selector: 'app-peli-detalle',
  templateUrl: './peli-detalle.page.html',
  styleUrls: ['./peli-detalle.page.scss'],
})
export class PeliDetallePage implements OnInit {

  content: object = null;

  constructor
  (
    private peliServices: Peliservice,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() 
  {
    console.log('peli-detalle');
    let id = this.activedRoute.snapshot.paramMap.get('id');
	  this.peliServices.getDetails(id).subscribe(results => this.content = results);
  }

}
