import { ComentariosService } from 'src/app/Services/comentarios.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from '../model/Comentarios.models';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  constructor(

    private db: ComentariosService,
    private data: ComentariosService,   //FB:DBSERVICES
    private router: Router,
    private sqlite : SQLite,
    private comentariosS : ComentariosService
  ) {
    // this.obtenerComentarios2();
  }

    Data: any[]=[];

  ngOnInit()
  {
    // //INTENTO 2 SQLITE
    // this.sqlite.create({
    //   name : 'data.db',
    //   location: 'default'
    // }).then((db) =>{
    //   this.comentariosS.setDataBase(db);
    //   return this.comentariosS.CreateTable();
    // }
    // ).catch(error =>{
    //   console.log(error)
    // });



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
//SQLITE 2
  // com2 : any=[];
  // obtenerComentarios2()
  // {
  //   this.comentariosS.GETCOMENTARIOS2().then(com =>
  //     {

  //       this.com2= com;

  //     }).catch(error =>{
  //       console.log(error);
  //     })
  // }


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
