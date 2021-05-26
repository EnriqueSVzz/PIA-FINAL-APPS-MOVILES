import { SafeResourceUrl } from "@angular/platform-browser";

//DEFINIMOS NIESTRO OBJTEO DE TIPO ESTRENOS CON LA VARIABLE "urlSafe" DE TIPO SafeResourceUrl
//PARA PODER HACER LA INSERCIÓN DEL VIDEO EN LA PAGINA DE HTML

export class Estrenos
{
    titulo : string;
    genero : string;
    disponible : string;
    trailerUrl : string;
    fecha : string;
    urlSafe:SafeResourceUrl;
}
