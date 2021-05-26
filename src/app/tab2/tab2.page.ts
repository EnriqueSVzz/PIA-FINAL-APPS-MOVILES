import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Estrenos } from './tab2.model';
import { PubilicidadServices } from './tab2.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  estrenos : Estrenos[]=[];

  constructor(
    private estrenoServices: PubilicidadServices,
    public navCtrl : NavController,
    private sanitizer : DomSanitizer) {}

    //FUNCION PRINCIPLA DE LA CUAL OBTENEMOS LOS DATOS DE ESTRENOS[]
  ngOnInit()
  {
    this.estrenos = this.estrenoServices.getAllEstrenos();
    console.log(this.estrenos);

    //CICLO QUE NOS AYUDA A USAR LOS LINKS DEL VIDEO Y COLOCARLOS EN EL HTML

    this.estrenos.forEach( trailer =>{
      trailer.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(trailer.trailerUrl);
    });
  }


}
