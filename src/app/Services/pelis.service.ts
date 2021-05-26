import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pelis } from '../model/Pelis.models';

@Injectable({
    providedIn: 'root'
})

export class Peliservice{

  //DECLARAMOS LAS VARIABLES QUE VAMOS A UTILIZAR

    private url: string='';
    private apiKey: string = '3387c729';  //ESTA ES NUESTRA API KEY

    constructor(private http: HttpClient) {}

    //HACEMOS UNA BUSQUEDA CONCATENADO EL TITULO, EL TIPO Y EL APIKEY, PARA POSTERIORMENTE
    //TRABAJARLO UN URL MÁS COMPLETO.

    buscarPeliculas(title: string, type:string)
    {
        console.log('BuscarPeliculas');
        this.url = `http://www.omdbapi.com/?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`;
        console.log(this.url);
        return this.http.get<Pelis>(this.url).pipe(map (results => results['Search']));
    }

    //ESTA FUNCIÓN TOMA EL ID DE UNA DE LAS BUSQUEDAS SELECCIONADAS Y NOS RETORNA TODOS LOS DATOS DE
    //LA API CONCATENANDO EL ID CON EL URL

    getDetails(id:string)
    {
        return this.http.get<Pelis>(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${this.apiKey}`);
    }

}
