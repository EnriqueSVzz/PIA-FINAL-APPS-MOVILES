import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from '../model/Comentarios.models';
import { ComentariosService } from '../Services/comentarios.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  constructor(

    private db: ComentariosService,
    private data: ComentariosService,   //FB:DBSERVICES
    private router: Router
  ) {}

    Data: any[]=[];

  ngOnInit()
  {
    //PROCEDIMENTO QUE NOS AYUDA A OBTENER LOS DATOS DE LA BASE DE SQLite CON LA FUNCION
    //fetchComentarios() DECLARADA EN EL SERVICES COMENTARIOS
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchComentarios().subscribe(item => {
          this.Data = item

        })
      }
    });
  }


  //FUNCIÓN QUE NOS TARE LOS VALORES DEL ARREGLO DE COMENTRIOS
  getComentarios():Comentario[]
  {
    //console.log("getComenatrios Tab3");
    return this.data.getCome();
  }

  //FUNCIÓN QUE NOS ROUTEA A EL FROMULARIO
  addComentFromFrom()
  {
    this.router.navigateByUrl("/Agregar_com");
  }


}
