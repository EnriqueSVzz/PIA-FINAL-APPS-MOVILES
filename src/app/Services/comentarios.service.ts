import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Comentario } from 'src/app/model/Comentarios.models';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})




export class ComentariosService {

  // AQUÍ DECLARAMOS LAS VARIABLES CON SUS TIPOS, QUE VAMOS A UTILIZAR

  private storage: SQLiteObject;
  comentariosList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  //HACEMOS LA INYECCIÓN DE DEPENDENCIAS
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {

    //AQUI VEMOS SI LA BASE DE DATOS ESTA LISTA, SI LO ESTÁ, SE CREA
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  // SI LA BASE DE DATOS ESTA LISTA, REGRESA UN BOOLEAN QUE CONFIRME SU ESTADO

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchComentarios(): Observable<Comentario[]> {
    return this.comentariosList.asObservable();
  }


  //SE ACCESA A LA BASE DE DATOS, USANDO HTTPCLIENT, DENTRO DE LA CARPETA 'assets/base_com.sql'


  getFakeData() {
    this.httpClient
    .get('assets/base_com.sql',{ responseType: 'text' })
    .subscribe((data) => {
      this.sqlPorter
        .importSqlToDb(this.storage, data)
        .then( (_) => {
          this.getComentarios();
          this.isDbReady.next(true);
        })
        .catch((error) => console.error(error));
    });
  }

  //OBTENEMOS LA DATA DE LA BASE DE DATOS CREADA CON SQLITE Y LOS "PUSHEAMOS" A UN ITEM Y SE
  //AGREGA A COMENTARIOSLIST

  getComentarios(){
    return this.storage
    .executeSql('SELECT * FROM comentariostable', [])
    .then((res) => {
      let items: Comentario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            userName: res.rows.item(i).userName,
            resena: res.rows.item(i).resena,
            titulo: res.row.item(i).titulo
           });
        }
      }
      this.comentariosList.next(items);
    });
  }

  //HACE UNA INSERCIÓN A LA BASE DE DATOS CON LOS DATOS DEL FORMULARIOS

  addComentarios(userName, resena,titulo) {
    let data = [userName,resena, titulo];
    return this.storage.executeSql('INSERT INTO comentariostable (userName,resena,titulo) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getComentarios();
    });
  }



  //-----------------------------------------------------------//

  //Forms

  //CREACIÓN DEL ARREGLO COMENTARIOS  DEL TIPO COMENTARIO, QUE ES EL MODELO QUE CREAMOS

  public comentarios : Comentario[]=[
    {
      id:0,
      userName: 'Enrique Vazquez',
      resena: 'Me parece muy buena pelicula',
      titulo: 'Spider-man',
      },
    {
      id:1,
      userName: 'Luis Chacon',
      resena: 'ME ENCANTA',
      titulo: 'Shrek',
    },
  ];


  //AQUI NOS TRAEMOS LOS DATOS DEL ARREGLO DE COMENTARIOS

  public getCome() : Comentario[]
  {
    return this.comentarios;
  }

  //GUARDAMOS LOS DATOS OBTENIDOS EN EL FORMS

  public addComenInput(comentario:any)
  {
    this.comentarios.unshift(
      {
        id:comentario.id,
        userName: comentario.userName,
        titulo: comentario.titulo,
        resena: comentario.resena
      });
  }


}
