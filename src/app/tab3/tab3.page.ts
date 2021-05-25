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
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchComentarios().subscribe(item => {
          this.Data = item
          
        })
      }
    });
  }


  getComentarios():Comentario[]
  {
    //console.log("getComenatrios Tab3");
    return this.data.getCome();
  }

  addComentFromFrom()
  {
    this.router.navigateByUrl("/Agregar_com");
  }


}
