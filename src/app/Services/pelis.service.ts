import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pelis } from '../model/Pelis.models';

@Injectable({
    providedIn: 'root'
})

export class Peliservice{

    private url: string='';
    private apiKey: string = '3387c729';
    constructor(private http: HttpClient) {}

    buscarPeliculas(title: string, type:string)
    {
        console.log('BuscarPeliculas');
        this.url = `http://www.omdbapi.com/?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`;
        console.log(this.url);
        return this.http.get<Pelis>(this.url).pipe(map (results => results['Search']));
    }

    getDetails(id:string)
    {
        return this.http.get<Pelis>(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${this.apiKey}`);
    }

}