import { SQLite } from '@ionic-native/sqlite/ngx';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/model/Comentarios.models';
import { ComentariosService } from 'src/app/Services/comentarios.service';



@Component({
  selector: 'app-com-detalle',
  templateUrl: './com-detalle.page.html',
  styleUrls: ['./com-detalle.page.scss'],
})

export class ComDetallePage implements OnInit {


  // DECLARACION DE LAS VARIBALES Y EL FORMULARIO

  comentarios: Comentario;

  comenatrios2: any = {usreName:' ', resena: ' ', titulo: ' '};

  datosForm: FormGroup;

  mensajesVal = {
    datos: [
      {type:"required", message: "Por favor llene el dato completo."},
      {type:"pattern", message: "Por favor use carácteres válidos."},
    ]
  }

  constructor
  (
    private db:ComentariosService,
    private formBuilder: FormBuilder,
    private com:ComentariosService,
    private comentariosS: ComentariosService,
    private sqlite: SQLite,
    private router: Router
  )
  {
    //CREAMOS EL FORMS Y LE DAMOS SU RESPECTIVA FROMA CON VALIDACIONES PARA SUS CAMPOS
    this.datosForm = this.formBuilder.group({

      userName : new FormControl("", Validators.compose([

        Validators.required,

        Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")

      ])),
      titulo : new FormControl("", Validators.compose([

        Validators.required,

        Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")

      ])),
      resena : new FormControl("", Validators.compose([

        Validators.required,

        Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")

      ]))
      }
    )
  }

  ngOnInit() {
    //INTENTO DE USO DE SQLite PERO NO NOS CARGA NADA
    /*this.db.dbState().subscribe((res) => {

      if (res) {

        this.db.fetchSongs().subscribe(item => {

          this.Data = item

        })

      }

    }); */
  }

  //FUNCION QUE RECIBE LOS VALORES DEL FORMS Y LOS INSERTA MEDIANTE LA FUNCION "addComenInput()"
  //DECLARADA EN EL SERVICES COMENTARIOS
  //Y NOS REDIRECCIÓNA AL TAB3
  addComent(datos)
  {
    this.com.addComenInput(datos);
    this.router.navigateByUrl("/tabs/tab3");
  }

  //FUNCIONA PARA ALMACENAR LO DATOS DEL FORMS EN LA BASE DE DATOS
  //Y NOS REDIRECCIÓNA AL TAB3
  storeData()
  {
    this.db.addComentarios(
      this.datosForm.value.userName,
      this.datosForm.value.titulo,
      this.datosForm.value.resena
    )

    this.router.navigateByUrl("/tabs/tab3");
    console.log(this.datosForm.value.userName);
    console.log("store data");
  }

  // agregarComentario()
  // {
  //   this.comentariosS.ADDCOMENTARIOS2(this.comenatrios2)
  //   .then(respuesta => {
  //     this.router.navigateByUrl("/tabs/tab3");
  //   }).catch(eror => {
  //     console.log(eror);
  //   })
  // }

  //BOTON QUE NOS AYUDA SALIR DEL FORMULARIO
  getBackButtonText() {

    const win = window as any;

    const mode = win && win.Ionic && win.Ionic.mode;

    return mode === 'ios' ? 'Inbox' : '';

  }

}
