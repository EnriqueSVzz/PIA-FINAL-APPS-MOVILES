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

  private storage: SQLiteObject;
  comentariosList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
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

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchComentarios(): Observable<Comentario[]> {
    return this.comentariosList.asObservable();
  }

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

  addComentarios(userName, resena,titulo) {
    let data = [userName,resena, titulo];
    return this.storage.executeSql('INSERT INTO comentariostable (userName,resena,titulo) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getComentarios();
    });
  }



  //Forms
  public comentarios : Comentario[]=[
    {
      id:0,
      userName: 'Enrique Doriloko',
      resena: 'Me parece muy buena pelicula',
      titulo: 'Spider-man',
      },
    {
      id:1,
      userName: 'Luis Chacon',
      resena: 'Me parece muy buena pelicula',
      titulo: 'Shrek',
    },
  ];


  public getCome() : Comentario[]
  {
    return this.comentarios;
  }

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
