
import { Injectable } from "@angular/core";
import { Estrenos } from "./tab2.model";

@Injectable({
    providedIn:'root'
})

export class PubilicidadServices
{
    constructor(){}

    //DEFINIMOS UN ARREGLO DONDE GUARDAREMOS NUESTROS DATOS DE LA PESTAÑA ESTRENOS
    //EN UN ARREGLO DE TIPO ESTRENOS

    private publicidad : Estrenos [] =
    [
        {
            titulo : 'Fast And Furious 9',
            genero :'Action and Suspense',
            disponible : 'Available in all cinemas',
            trailerUrl : 'https://www.youtube.com/embed/QJC2kxfZEfw',
            fecha : 'June 25, 2021 ',
            urlSafe: ' '
        },
        {
            titulo:'Venom Let There Be Carnage',
            genero:'Action and Fantasy',
            disponible : 'Available in all cinemas',
            trailerUrl : 'https://www.youtube.com/embed/-ezfi6FQ8Ds',
            fecha:'September 17, 2021',
            urlSafe: ' '
        },
        {
            titulo:'A Quiet Place 2',
            genero:'Fantasy, Horror and Suspense',
            disponible : 'Available in all cinemas',
            trailerUrl : 'https://www.youtube.com/embed/BpdDN9d9Jio',
            fecha:'May 31, 2021',
            urlSafe: ' '
        }
    ];

    //ESTA FUNCIÓN NOS AYUDA A POBTENER LOS DATOS DE NUESTRO ARREGLO

    getAllEstrenos()
    {
        return[...this.publicidad];
    }
}
