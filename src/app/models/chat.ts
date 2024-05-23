export class Chat{
    fecha : string;
    user : string;
    mensaje : string;

    constructor( fecha : string ,user : string , mensaje : string){
        this.fecha = fecha;
        this.user = user;
        this.mensaje = mensaje;
    }
}